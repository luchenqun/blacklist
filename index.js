const ethers = require("ethers");

// 连接到以太坊节点
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// 定义智能合约 ABI 和字节码
const contractABI = [
  {
    inputs: [],
    name: "get",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const contractBytecode = "0x6080604052348015600f57600080fd5b5060ac8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146049575b600080fd5b60476042366004605e565b600055565b005b60005460405190815260200160405180910390f35b600060208284031215606f57600080fd5b503591905056fea2646970667358221220b7ecaee1a1328d17741f972bbc2aaae7f09e1752ea4430d1c89ac36424488d3f64736f6c63430008110033";

// 创建钱包并获取其私钥
const privateKey = "0xf78a036930ce63791ea6ea20072986d8c3f16a6811f6a2583b0787c45086f769";
const wallet = new ethers.Wallet(privateKey, provider);

// 构造合约工厂对象
const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

// 部署合约
async function deployContract() {
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`Contract address: ${contract.address}`);
  return contract;
}

// 调用合约方法
async function callContractMethod(contract) {
  console.log("dddddddddddddddddd");
  const message = await contract.get();
  console.log(`Current message: ${message.toString()}`);

  const newMessage = 2452;
  await contract.set(newMessage);

  const updatedMessage = await contract.get();
  console.log(`Updated message: ${updatedMessage}`);
}

// 运行示例
async function run() {
  const contract = await deployContract();
  await callContractMethod(contract);
}

run();
