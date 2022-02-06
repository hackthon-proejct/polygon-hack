pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MintSubmission is ERC721URIStorage {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIds;

    address owner;

    error Unauthorized();

    modifier onlyBy(address _account) {
        if (msg.sender != _account) revert Unauthorized();
        _;
    }
    event Mint(uint256 tokenId, string url, address indexed sender);

    constructor() ERC721("Bounty", "BTY") {
        owner = msg.sender;
    }

    function mint(address _to, string memory _tokenURI)
        public
        payable
        onlyBy(owner)
        returns (uint256 id)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        emit Mint(newItemId, _tokenURI, _to);
        return newItemId;
    }
}
