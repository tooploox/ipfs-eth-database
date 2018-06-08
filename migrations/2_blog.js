var Blog = artifacts.require("./Blog.sol");

const GWEI = 10**9;

module.exports = function(deployer) {
  deployer.deploy(Blog, 4 * GWEI, 200000);
};
