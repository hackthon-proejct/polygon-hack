pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

abstract contract Treasury {
    using SafeMath for uint256;
    address payable owner;

    // the total balance in this treasury
    // recorded at the time of vote and used to calculate equity share
    uint256 totalContribution;

    mapping(address => uint8) pctBalanceRemaining; // fan address => pct equity remaining
    mapping(address => uint256) public equity; // fan address => contribution
    mapping(address => uint256) public votingEquity; // fan address => voting rights
    address payable[] public fans; // fan address to withdraw to, mirrors equity
    address payable public creatorWallet;

    uint8[] public bonusTargets; // the payout percentages (out of 100) for bonus targets 0,1,2,..
    uint64[] public bonusDeadlines; // the time that bonus[i] expires defaulting to NO
    uint8[] public bonusPctYeasNeeded; // pct yeas needed to pass bonus[i]
    uint8[] public bonusFailures; // how many times bonus[i] has failed a vote
    uint8[] public bonusFailureThresholds; // how many times bonus[i] can fail before automatic withdrawal

    uint64 public endTime; // the time that this contract expires and mints automatically
    bool isPrecipitatingEvent; // IFF true, withdrawals can take place

    uint8 public votingOn; // the current milestone that votes are tallied towards

    error Unauthorized();
    error TooLate();
    error AlreadyPaid();
    error NoEquity();
    error MaxValueReached();

    modifier onlyBy(address _account) {
        if (msg.sender != _account) revert Unauthorized();
        _;
    }
    modifier onlyBefore(uint64 _time) {
        if (block.timestamp > _time) revert TooLate();
        _;
    }
    modifier onlyWithEquity() {
        if (equity[msg.sender] == 0) revert NoEquity();
        _;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return equity[_owner].mul(pctBalanceRemaining[_owner]).div(100);
    }

    function equityOf(address _owner) public view returns (uint256 balance) {
        return equity[_owner];
    }

    function withdraw() public onlyWithEquity returns (bool success) {
        if (!isPrecipitatingEvent) {
            return false;
        }
        uint256 amount = balanceOf(msg.sender);
        payable(msg.sender).transfer(Math.min(amount, address(this).balance));
        // Wipe balance and equity from this user
        pctBalanceRemaining[msg.sender] = 0;
        equity[msg.sender] = 0;
        votingEquity[msg.sender] = 0;
        // Subtract from total so that all other %s are correct
        totalContribution -= amount;

        emit Withdraw(msg.sender, amount);
        return true;
    }

    function precipitatingEvent(bool onOff)
        public
        onlyBy(owner)
        returns (bool success)
    {
        isPrecipitatingEvent = onOff;
        return true;
    }

    function nextMilestone() private returns (bool success) {
        emit Debug("nextMilestone");
        if (votingOn < bonusTargets.length - 1) {
            votingOn += 1;
        }
        return true;
    }

    // Called by server at time of expiry - should check whether this vote
    // actually succeeded and auto fail/withdraw/move on otherwise
    function failMilestone() internal returns (bool success) {
        emit Debug("failMilestone");
        bonusFailures[votingOn] += 1;
        if (bonusFailures[votingOn] == bonusFailureThresholds[votingOn]) {
            return failAndWithdraw();
        }
        return false;
    }

    function failAndWithdraw() internal returns (bool success) {
        emit Debug("failAndWithdraw");
        // the amount about to be disbursed among all equity holders
        uint256 disbursement = totalContribution
            .mul(bonusTargets[votingOn])
            .div(100);
        for (uint256 i = 0; i < fans.length; i += 1) {
            // calculate the equity % from totalContribution vs equity
            uint256 pctContrib = equity[fans[i]].mul(100).div(
                totalContribution
            ); // percent * 100
            fans[i].transfer(disbursement.mul(pctContrib).div(100));
        }
        // adjust all balances downward
        adjustBalances(disbursement);

        emit Failure(votingOn);
        return nextMilestone();
    }

    function approveAndPay() internal returns (bool success) {
        emit Debug("approveAndPay");
        if (bonusTargets[votingOn] == 0) {
            revert AlreadyPaid();
        }
        uint256 disbursement = totalContribution
            .mul(bonusTargets[votingOn])
            .div(100);
        creatorWallet.transfer(disbursement);
        bonusTargets[votingOn] = 0;
        // adjust all balances downward
        adjustBalances(disbursement);

        emit Approval(votingOn, disbursement, creatorWallet);
        return nextMilestone();
    }

    function adjustBalances(uint256 disbursement)
        private
        returns (bool success)
    {
        emit Debug("adjustBalances");
        // calc the % to adjust downward
        uint256 pctAdjust = disbursement.mul(100).div(totalContribution);
        for (uint256 i = 0; i < fans.length; i += 1) {
            pctBalanceRemaining[fans[i]] -= uint8(pctAdjust);
        }
        return true;
    }

    event Withdraw(address indexed _to, uint256 _amount);
    event Approval(uint8 _milestone, uint256 _amount, address _creatorWallet);
    event Failure(uint8 _milestone);
    event Debug(string indexed msg);
}

contract Bounty is Treasury {
    using SafeMath for uint256;

    mapping(address => bool) votedThisRound; // whether this address has already voted
    uint64 public mustBeClaimedTime; // the time epoch at which this bounty expires if unclaimed
    uint256 public maxValue; // the max value this bounty could be
    uint256 public reservePrice; // the lowest value that this bounty can be, otherwise it expires
    uint64 public timeLimit; // the time limit in seconds that this bounty must be completed in
    uint256 public currentYeas; // yea vote weight for the current bonus
    uint256 public currentNays; // nay vote weight for the current bonus
    uint32 public currentVotesCast; // number of discrete votes cast for the current bonus
    uint8 public status; // [UNCLAIMED, CLAIMED, SUCCESS, FAILURE]

    error VoteOver();
    error AlreadyVoted();

    constructor(
        address payable _creatorWallet,
        uint256 _maxValue,
        uint256 _reservePrice,
        uint8[] memory _bonusTargets,
        uint8[] memory _bonusPctYeasNeeded,
        uint8[] memory _bonusFailureThresholds,
        uint64 _mustBeClaimedTime,
        uint64 _timeLimit,
        address payable _owner
    ) {
        creatorWallet = _creatorWallet;
        maxValue = _maxValue;
        reservePrice = _reservePrice;
        bonusTargets = _bonusTargets;
        bonusPctYeasNeeded = _bonusPctYeasNeeded;
        bonusFailureThresholds = _bonusFailureThresholds;
        mustBeClaimedTime = _mustBeClaimedTime;
        owner = _owner;
        isPrecipitatingEvent = true;
        timeLimit = _timeLimit;
        bonusFailures = new uint8[](bonusTargets.length);
    }

    function uniqueFans() public view returns (uint8 num) {
        return uint8(fans.length);
    }

    // Returns [totalContribution, isPrecipitatingEvent, status]
    function bountyStatus() public view returns (uint256[3] memory stats) {
        uint256 isPrecipitatingEventNum = isPrecipitatingEvent ? 1 : 0;
        return [totalContribution, isPrecipitatingEventNum, uint256(status)];
    }

    // Returns [milestone, yeasNeeded, yeas, nays, timesFailed, failureThreshold, totalVoters]
    function voteStatus() public view returns (uint256[7] memory stats) {
        return [
            votingOn,
            bonusPctYeasNeeded[votingOn],
            currentYeas,
            currentNays,
            uint256(bonusFailures[votingOn]),
            bonusFailureThresholds[votingOn],
            currentVotesCast
        ];
    }

    function join()
        public
        payable
        onlyBefore(mustBeClaimedTime)
        returns (bool success)
    {
        emit Debug("join called");
        if (msg.value == 0) {
            revert NoEquity();
        }
        if (address(this).balance + msg.value >= maxValue) {
            revert MaxValueReached();
        }
        if (equity[msg.sender] == 0) {
            // fan not added yet
            fans.push(payable(msg.sender));
            pctBalanceRemaining[msg.sender] = 100;
        }
        equity[msg.sender] += msg.value;

        totalContribution += msg.value;
        return true;
    }

    function checkVote() public onlyBy(owner) returns (bool success) {
        uint8 _status = checkVoteMarginMet();
        if (_status != 0) {
            bool result;
            if (_status == 1) {
                result = approveAndPay();
            } else if (_status == 2) {
                result = failMilestone();
            }
            // result is true if we took a step forward, otherwise false
            if (result) {
                // Wipe the state if either of these things happens
                wipeStateForBonus();
            }
            return result;
        }
    }

    // Returns 0 if not a done vote yet, 1 if passed, 2 if failed
    function checkVoteMarginMet() private view returns (uint8 met) {
        uint256 yeasNeeded = totalContribution
            .mul(bonusPctYeasNeeded[votingOn])
            .div(100);
        if (currentYeas >= yeasNeeded) {
            return 1;
        } else if (currentNays >= totalContribution - yeasNeeded) {
            return 2;
        }
        return 0;
    }

    function vote(uint8 _milestone, bool _vote)
        public
        onlyWithEquity
        returns (bool success)
    {
        emit Debug("vote called");
        // Not yet claimed
        if (status == 0 || _milestone != votingOn) {
            revert VoteOver();
        }
        if (votedThisRound[msg.sender]) {
            revert AlreadyVoted();
        }
        uint256 amount = equityOf(msg.sender);
        if (_vote) {
            currentYeas += amount;
        } else {
            currentNays += amount;
        }
        currentVotesCast += 1;
        votedThisRound[msg.sender] = true;

        emit Vote(msg.sender, _vote);

        uint8 _status = checkVoteMarginMet();
        if (_status != 0) {
            bool result;
            if (_status == 1) {
                result = approveAndPay();
            } else if (_status == 2) {
                result = failMilestone();
            }
            // result is true if we took a step forward, otherwise false
            if (result) {
                // Wipe the state if either of these things happens
                wipeStateForBonus();
            }
            return result;
        }
        return true;
    }

    function negotiate(
        uint256 _maxValue,
        uint256 _reservePrice,
        uint8[] memory _bonusTargets,
        uint8[] memory _bonusPctYeasNeeded,
        uint8[] memory _bonusFailureThresholds,
        uint64 _timeLimit
    ) public onlyBy(owner) returns (bool success) {
        if (status != 0) {
            return false;
        }
        reservePrice = _reservePrice;
        maxValue = _maxValue;
        bonusTargets = _bonusTargets;
        bonusFailureThresholds = _bonusFailureThresholds;
        bonusPctYeasNeeded = _bonusPctYeasNeeded;
        timeLimit = _timeLimit;
        return true;
    }

    // Sets initial state and sets the end time of this bounty according to config
    function claim() public onlyBy(owner) returns (bool success) {
        // Already claimed
        if (status != 0) {
            return false;
        }
        endTime = uint64(block.timestamp + timeLimit);
        isPrecipitatingEvent = false;
        status = 1;
        return true;
    }

    function wipeStateForBonus() private returns (bool success) {
        currentYeas = 0;
        currentNays = 0;
        currentVotesCast = 0;
        for (uint256 i = 0; i < fans.length; i += 1) {
            votedThisRound[fans[i]] = false;
        }
        return true;
    }

    // _vote is false for nay, true for yea
    event Vote(address indexed _voter, bool _vote);
}
