const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const abi = require('../app/blog/contracts/abi/Blog.json');
const BlogConfig = require('../app/blog/config/blog.json');
const wallet = require("../wallet-config");

const web3 = new Web3(
  new HDWalletProvider(
    wallet.mnemonic,
    "https://rinkeby.infura.io/"
  )
);

const address = web3.eth.accounts.currentProvider.addresses[0];
const Blog = new web3.eth.Contract(abi, BlogConfig.address);
const fileAddress = process.argv.slice(2)[0];

function onConfirmation(confirmation) {
  console.log("Confirmation:" + confirmation);
  if(confirmation >= 15) {
    console.log("The post is available in your blog:");
    console.log("http://localhost:1234/#/u/" + address);
    process.exit();
  }
}

Blog.methods.addPost(fileAddress).send({from: address, gas: 5000000, value: 5000000000000000})
  .on('transactionHash', function(hash){ console.log("https://rinkeby.etherscan.io/tx/" + hash) })
  .on('confirmation', onConfirmation)
  .on('error', function(error){ console.log(error.message) });
