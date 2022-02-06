const Bounty = artifacts.require("./Bounty.sol");
const BN = require("bn.js");

const FIFTEEN_ZEROS = "000000000000000";
let bounty;
const maxValue = new BN("10" + FIFTEEN_ZEROS);
const reservePrice = new BN("2" + FIFTEEN_ZEROS);
const bonusTargets = [20, 20];
const bonusPctYeasNeeded = [40, 60];
const bonusFailureThresholds = [1, 1];
const mustBeClaimedTime = Math.floor(Date.now() / 1000) + 525600;
const timeLimit = 86400;
let creatorWallet;
let ourWallet;

function printVoteStatus(data) {
  console.log("**************VOTE STATUS***************");
  const keys = [
    "milestone",
    "pctYeasNeeded",
    "yeas",
    "nays",
    "timesFailed",
    "failureThreshold",
    "totalVoters",
  ];
  data.forEach((d, i) => {
    console.log(`${keys[i]}: ${d.toString()}`);
  });
  console.log("**************************************");
}

contract("Bounty", (accounts) => {
  beforeEach(async () => {
    creatorWallet = accounts[1];
    ourWallet = accounts[0];
    otherWallet = accounts[2];
    bounty = await Bounty.new(
      creatorWallet,
      maxValue,
      reservePrice,
      bonusTargets,
      bonusPctYeasNeeded,
      bonusFailureThresholds,
      mustBeClaimedTime,
      timeLimit,
      ourWallet
    );
    let data = await bounty.creatorWallet();
    console.log("wallet", data);
    data = await bounty.maxValue();
    console.log("max value", data.toString());
  });

  //   it("...can be joined with uniqueness", async () => {
  //     // Join the first time
  //     let resp = await bounty.join({
  //       from: accounts[0],
  //       value: new BN("1" + FIFTEEN_ZEROS),
  //     });
  //     console.log("joined", resp);
  //     let data = await web3.eth.getBalance(bounty.address);
  //     console.log("balance", data.toString());
  //     data = await bounty.equityOf(accounts[0]);
  //     console.log("equity", data.toString());
  //     console.log("fans", await bounty.fans(0));
  //     // Try to join again
  //     resp = await bounty.join({
  //       from: accounts[0],
  //       value: new BN("1" + FIFTEEN_ZEROS),
  //     });
  //     data = await bounty.equityOf(accounts[0]);
  //     console.log("new equity", data.toString());
  //     console.log("unique fans", (await bounty.uniqueFans()).toString());
  //   });

  //   it("...can be claimed by creator", async () => {
  //     // End time should be 0
  //     let data = await bounty.endTime();
  //     console.log("end time", data.toString());
  //     // After claim
  //     let resp = await bounty.claim({
  //       from: accounts[1],
  //     });
  //     console.log("claimed", resp);
  //     data = await bounty.endTime();
  //     console.log("end time", data.toString());
  //     // Try claiming with wrong account
  //     try {
  //       resp = await bounty.claim({
  //         from: accounts[0],
  //       });
  //     } catch (err) {
  //       console.log("claim invalid", err);
  //     }
  //     // Try claiming again
  //     resp = await bounty.claim({
  //       from: accounts[1],
  //     });
  //     console.log("claim again", resp);
  //   });

  it("...can be voted on", async () => {
    // Join the first time
    console.log("Join owner 3");
    await bounty.join({
      from: ourWallet,
      value: new BN("3" + FIFTEEN_ZEROS),
    });
    console.log("joined", ourWallet);
    let data = await bounty.balanceOf(ourWallet);
    console.log("our balance", data.toString());

    // Join with someone else
    console.log("Join other 2");
    await bounty.join({
      from: otherWallet,
      value: new BN("2" + FIFTEEN_ZEROS),
    });
    console.log("joined", otherWallet);
    data = await bounty.balanceOf(otherWallet);
    console.log("other balance", data.toString());

    // Negotiate
    console.log("Negotiate creator");
    await bounty.negotiate(
      maxValue,
      reservePrice,
      bonusTargets,
      bonusPctYeasNeeded,
      bonusFailureThresholds,
      timeLimit,
      {
        from: ourWallet,
      }
    );
    data = await bounty.negotiationStatus();
    console.log("data", data);
    data = await bounty.balanceOf(ourWallet);
    console.log("our balance", data.toString());

    console.log("Can leave and withdraw");
    await bounty.negotiateLeave({ from: ourWallet });
    data = await web3.eth.getBalance(ourWallet);
    console.log("our wallet", data.toString());
    data = await bounty.bountyStatus();
    console.log("data", data);

    console.log("Can rejoin");
    await bounty.negotiateRejoin(otherWallet, { from: ourWallet });
    data = await bounty.balanceOf(otherWallet);
    console.log("other balance", data.toString());
    data = await bounty.bountyStatus();
    console.log("data", data);
  });

  //   it("...can be voted on", async () => {
  //     // Join the first time
  //     console.log("Join owner 3");
  //     await bounty.join({
  //       from: ourWallet,
  //       value: new BN("3" + FIFTEEN_ZEROS),
  //     });
  //     console.log("joined", ourWallet);
  //     let data = await bounty.balanceOf(ourWallet);
  //     console.log("our balance", data.toString());

  //     // Join with someone else
  //     console.log("Join other 2");
  //     await bounty.join({
  //       from: otherWallet,
  //       value: new BN("2" + FIFTEEN_ZEROS),
  //     });
  //     console.log("joined", otherWallet);
  //     data = await bounty.balanceOf(otherWallet);
  //     console.log("other balance", data.toString());

  //     // Claim
  //     console.log("Claim creator");
  //     await bounty.claim({
  //       from: creatorWallet,
  //     });
  //     data = await bounty.voteStatus();
  //     printVoteStatus(data);

  //     // Vote
  //     console.log("Vote 0 yea");
  //     await bounty.vote(0, true, {
  //       from: otherWallet,
  //     });
  //     data = await bounty.voteStatus();
  //     printVoteStatus(data);
  //     data = await web3.eth.getBalance(bounty.address);
  //     console.log("bounty balance", data.toString());
  //     data = await web3.eth.getBalance(creatorWallet);
  //     console.log("creator wallet", data.toString());
  //     data = await bounty.balanceOf(ourWallet);
  //     console.log("our balance", data.toString());
  //     data = await bounty.balanceOf(otherWallet);
  //     console.log("other balance", data.toString());

  //     // Vote again nay (should trigger withdrawal)
  //     console.log("Vote 1 nay");
  //     await bounty.vote(1, false, {
  //       from: otherWallet,
  //     });
  //     data = await bounty.voteStatus();
  //     printVoteStatus(data);
  //     data = await web3.eth.getBalance(bounty.address);
  //     console.log("bounty balance", data.toString());
  //     data = await web3.eth.getBalance(creatorWallet);
  //     console.log("creator wallet", data.toString());
  //     data = await web3.eth.getBalance(ourWallet);
  //     console.log("our wallet", data.toString());
  //     data = await bounty.balanceOf(ourWallet);
  //     console.log("our balance", data.toString());
  //     data = await web3.eth.getBalance(otherWallet);
  //     console.log("other wallet", data.toString());
  //     data = await bounty.balanceOf(otherWallet);
  //     console.log("other balance", data.toString());

  //     // Withdraw (not precipitating event, should no-op)
  //     console.log("Withdraw no-op");
  //     await bounty.withdraw({
  //       from: ourWallet,
  //     });
  //     data = await web3.eth.getBalance(bounty.address);
  //     console.log("bounty balance", data.toString());
  //     data = await bounty.balanceOf(ourWallet);
  //     console.log("our balance", data.toString());

  //     // Withdraw (should withdraw 80% of equity)
  //     console.log("Withdraw working");
  //     await bounty.precipitatingEvent(true, {
  //       from: ourWallet,
  //     });
  //     await bounty.withdraw({
  //       from: ourWallet,
  //     });
  //     data = await web3.eth.getBalance(bounty.address);
  //     console.log("bounty balance", data.toString());
  //     data = await bounty.balanceOf(ourWallet);
  //     console.log("our balance", data.toString());
  //   });
});
