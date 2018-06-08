var Blog = artifacts.require("./Blog.sol");

module.exports = function(deployer) {
  deployer.deploy(Blog);
};
