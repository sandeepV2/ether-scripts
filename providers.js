import { ethers } from "ethers";
import "dotenv/config";

const infuraId = process.env.INFURA_API_KEY;

let url = `https://mainnet.infura.io.infura.io/v3/${infuraId}`;

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${infuraId}`
);

console.log(`https://mainnet.infura.io.infura.io/v3/${infuraId}`);

// await can be out of the function. node 14+

provider
  .getBlockNumber()
  .then((blockNumber) => {
    console.log(blockNumber);
  })
  .catch((error) => {
    console.error(error);
  });

// console.log("atg.eth is ", await provider.resolveName("atg.eth"));

// lookup address, (address -> name)
console.log(
  "0x34aA3F359A9D614239015126635CE7732c18fDF3 is ",
  await provider.lookupAddress("0x34aA3F359A9D614239015126635CE7732c18fDF3")
);

const vatalikBal = await provider.getBalance("vitalik.eth");
let sanfordBal = await provider.getBalance("sanfordstout.eth");

console.log(ethers.utils.formatEther(vatalikBal));
console.log(ethers.utils.formatEther(sanfordBal));

sanfordBal = sanfordBal.add(ethers.utils.parseEther("5000"));
if (vatalikBal.gt(sanfordBal)) {
  console.log("vatalik has more ethers than sanfordstout");
} else {
  console.log("sanfordstout has more ethers than vatalik");
}
