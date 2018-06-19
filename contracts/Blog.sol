pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./lib/usingOraclize.sol";
import "./lib/strings.sol";


contract Blog is usingOraclize, Ownable {
  using strings for *;

  mapping(address => string[]) public hashesByAuthor;
  mapping(bytes32 => string) public hashByQueryId;
  mapping(bytes32 => address) public authorByHash;

  event PostAdded(address indexed author, string hash, uint timestamp, string title);
  event PostSubmitted(address indexed author, string hash, bytes32 queryId);

  uint private gasLimit;

  constructor(uint _gasPrice, uint _gasLimit) public {
    setCustomOraclizeGasPrice(_gasPrice);
    setCustomOraclizeGasLimit(_gasLimit);
  }

  function getPrice(string _source) public view returns (uint) {
    return oraclize_getPrice(_source);
  }

  function setCustomOraclizeGasPrice(uint _gasPrice) public onlyOwner {
    oraclize_setCustomGasPrice(_gasPrice);
  }

  function setCustomOraclizeGasLimit(uint _gasLimit) public onlyOwner {
    gasLimit = _gasLimit;
  }

  function withdraw() public onlyOwner {
    owner.transfer(address(this).balance);
  }

  function __callback(bytes32 _queryId, string _title) public {
    require(msg.sender == oraclize_cbAddress());
    require(bytes(hashByQueryId[_queryId]).length != 0);
    string memory hash = hashByQueryId[_queryId];
    address author = authorByHash[keccak256(bytes(hash))];
    hashesByAuthor[author].push(hash);
    emit PostAdded(author, hash, now, _title);
  }

  function addPost(string _hash) public payable returns (bool) {
    require(authorByHash[keccak256(bytes(_hash))] == address(0), "This post already exists");
    require(msg.value >= oraclize_getPrice("IPFS"), "The fee is too low");
    bytes32 queryId = oraclize_query("IPFS", "json(".toSlice().concat(_hash.toSlice()).toSlice().concat(").title".toSlice()), gasLimit);
    authorByHash[keccak256(bytes(_hash))] = msg.sender;
    hashByQueryId[queryId] = _hash;
    emit PostSubmitted(msg.sender, _hash, queryId);
    return true;
  }

  function getPriceOfAddingPost() public view returns (uint) {
    return oraclize_getPrice("IPFS");
  }
}
