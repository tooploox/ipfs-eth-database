module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 3,
      gas: 4700000
    },
    rinkeby: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 4
    },
    kovan: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 42,
      gas: 4700000
    }
  },
  optimizer: {
    enabled: true,
    runs: 200
  }
};
