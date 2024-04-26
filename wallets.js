import "dotenv/config";
import { BigNumber, ethers } from "ethers";

const infuraId = process.env.INFURA_API_KEY;
const walletPrivateKey = process.env.MY_WALLET_PRIVATE_KEY;

const sepoliaBaseUrl = `https://sepolia.infura.io/v3/${infuraId}`;
const provider = new ethers.providers.JsonRpcProvider(sepoliaBaseUrl);

const signer = new ethers.Wallet(walletPrivateKey, provider);

console.log(signer.address);
console.log(walletPrivateKey);
const walletBal = await provider.getBalance(signer.address);
console.log(ethers.utils.formatEther(walletBal));

const toAddress = "1F915AAf392414D03E71EFfdEBD5DcD93A145263";
const recieverBal = ethers.utils.formatEther(
  await provider.getBalance(toAddress)
);
console.log("Balance of reciever before transaction", recieverBal);

// send 10% of existing balance.
const tx = await signer.sendTransaction({
  to: toAddress,
  value: walletBal.div(BigNumber.from(10)),
});

console.log("TX initiated!");

await tx.wait();

console.log("TX confirmed");

const recieverBal1 = ethers.utils.formatEther(
  await provider.getBalance(toAddress)
);
console.log("Balance of reciever after transaction", recieverBal1);
