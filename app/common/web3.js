import Web3 from "web3";

let web3;
let web3Events;

export function getWeb3() {
  if (!web3 || !web3Events) {
    web3 = new Web3(Web3.givenProvider);
    web3Events = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/_ws"));
  }
  return { web3, web3Events };
}
