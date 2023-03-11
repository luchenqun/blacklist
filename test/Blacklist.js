const { expect } = require("chai");
const fs = require("fs-extra");

const deploy = async (data, from, address) => {
  const Simple = new web3.eth.Contract(data.abi, { data: data.bytecode, from });
  const simple = await Simple.deploy({ arguments: [address] }).send();
  return simple;
};

describe("Blacklist", function () {
  const from = "0x00000Be6819f41400225702D32d3dd23663Dd690";
  const data = fs.readJsonSync("./artifacts/contracts/Simple.sol/Simple.json");
  const ZeroAddress = "0x0000000000000000000000000000000000000000";
  describe("S1 Contract", function () {
    it("contract is not in the blacklist and must be send successfully", async function () {
      const simple = await deploy(data, from, ZeroAddress);
      const num = 255;
      await simple.methods.set(num).send();
      expect(Number(await simple.methods.get().call())).to.equal(num);
      expect(await simple.methods.addr().call()).to.equal(ZeroAddress);
    });
  });
});
