import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CipherQuestRewards contract...");

  // Get the contract factory
  const CipherQuestRewards = await ethers.getContractFactory("CipherQuestRewards");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const cipherQuestRewards = await CipherQuestRewards.deploy(verifierAddress);

  await cipherQuestRewards.waitForDeployment();

  const contractAddress = await cipherQuestRewards.getAddress();
  
  console.log("CipherQuestRewards deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString(),
    deployer: await cipherQuestRewards.runner?.getAddress(),
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
