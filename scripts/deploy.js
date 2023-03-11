// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const fs = require("fs-extra");

const deploy = async (data, from, address) => {
  const Simple = new web3.eth.Contract(data.abi, { data: data.bytecode, from });
  const simple = await Simple.deploy({ arguments: [address] }).send();
  return simple;
};

async function main() {
  const from = "0x00000Be6819f41400225702D32d3dd23663Dd690";
  const data = fs.readJsonSync("./artifacts/contracts/Simple.sol/Simple.json");
  const s2Address = "0xDad56A6B5eed8567Fc4395d05b59D15077c2c888";

  const s1 = await deploy(data, from, s2Address);
  console.log(`s1 address ${s1._address}`);

  const s2 = await deploy(data, from, s1._address);
  console.log(`s2 address ${s2._address}`);

  const s3 = await deploy(data, from, s2._address);
  console.log(`s3 address ${s3._address}`);

  // const s4 = await deploy(data, from, s3._address);
  // console.log(`s4 address ${s4._address}`);

  // const s5 = await deploy(data, from, s4._address);
  // console.log(`s5 address ${s5._address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
