require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-web3");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 6666,
          },
        },
      },
    ],
  },
  defaultNetwork: "localhost", // hardhat localhost
  networks: {
    hardhat: {
      chainId: 8801,
      accounts: [
        { privateKey: "f78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "95e06fa1a8411d7f6693f486f0f450b122c58feadbcee43fbd02e13da59395d5", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "322673135bc119c82300450aed4f29373c06926f02a03f15d31cac3db1ee7716", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "09100ba7616fcd062a5e507ead94c0269ab32f1a46fe0ec80056188976020f71", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "5352cfb603f3755c71250f24aa1291e85dbc73a01e9c91e7568cd081b0be04db", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "f3d9247d078302fd876462e2036e05a35af8ca6124ba1a8fd82fc3ae89b2959d", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "39cfe0662cdede90094bf079b339e09e316b1cfe02e92d56a4d6d95586378e38", balance: "100000000000000000000000000000000000000000000000000000" },
        { privateKey: "a78e6fe4fe2c66a594fdd639b39bd0064d7cefbbebf43b57de153392b0f4e30c", balance: "100000000000000000000000000000000000000000000000000000" },
      ],
    },
    localhost: {
      chainId: 20191205,
      url: "http://127.0.0.1:8545",
      gasPrice: 5000000000,
      accounts: ["f78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769"],
    },
  },
};
