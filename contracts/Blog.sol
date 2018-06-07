pragma solidity 0.4.24;

import "./usingOraclize.sol";
import "./strings.sol";


contract Blog is usingOraclize {
  using strings for *;

  mapping(address => string[]) public hashesByAuthor;
  mapping(bytes32 => string) public hashByQueryId;
  mapping(bytes32 => address) public authorByHash;

  event PostAdded(address indexed author, string hash, uint timestamp, string title);

  constructor() public payable {
  }

  function __callback(bytes32 _queryId, string _title) public {
    require(msg.sender == oraclize_cbAddress());
    require(bytes(hashByQueryId[_queryId]).length != 0);
    string memory hash = hashByQueryId[_queryId];
    address author = authorByHash[keccak256(hash)];
    hashesByAuthor[author].push(hash);
    emit PostAdded(author, hash, now, _title);
  }

  function addPost(string _hash) public payable returns (bool) {
    require(authorByHash[keccak256(_hash)] == address(0), "This post already exists");
    bytes32 queryId = oraclize_query("IPFS", "json(".toSlice().concat(_hash.toSlice()).toSlice().concat(").title".toSlice()));
    authorByHash[keccak256(_hash)] = msg.sender;
    hashByQueryId[queryId] = _hash;
    return true;
  }
}
