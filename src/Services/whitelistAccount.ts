import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Signer,
} from "@hashgraph/sdk";
import { CONTRACT_ID } from "../Config/constants";
import checkWhitelist from "./checkWhitelist";

const whitelistAccount = async (
  account: string,
  signer: Signer
): Promise<string> => {
  try {
    // Check if the account is already whitelisted
    const isWhitelisted = await checkWhitelist(account);
    if (isWhitelisted) {
      return "";
    }

    console.log(`Whitelisting account: ${account}`);

    // Create the transaction
    const transaction = await new ContractExecuteTransaction()
      .setContractId(CONTRACT_ID)
      .setGas(100000)
      .setFunction(
        "whitelist",
        new ContractFunctionParameters().addAddress(account)
      )
      .freezeWithSigner(signer);

    console.log("Transaction is preparing...");

    // Sign and execute the transaction
    const contractCallResult = await transaction.executeWithSigner(signer);
    const txId = contractCallResult.transactionId.toString();

    console.log(`Transaction executed successfully. Tx ID: ${txId}`);

    return txId;
  } catch (error) {
    console.error("Error executing whitelist transaction:", error);
    throw error;
  }
};

export default whitelistAccount;
