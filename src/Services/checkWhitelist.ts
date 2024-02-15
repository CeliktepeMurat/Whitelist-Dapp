import axios, { AxiosResponse } from "axios";

import { CONTRACT_ID } from "../Config/constants";
import { checkSumAddress, decodeEvents } from "./utils";

const getContractEvents = async (
  contractIdOrAddress: string
): Promise<any[]> => {
  try {
    const baseUrl: string = "https://testnet.mirrornode.hedera.com/api/v1";
    const url: string = `${baseUrl}/contracts/${contractIdOrAddress}/results/logs`;
    const response: AxiosResponse<any> = await axios.get(url);
    return response.data.logs;
  } catch (error) {
    console.error("Error fetching contract events:", error);
    throw error;
  }
};

const checkWhitelist = async (account: string): Promise<boolean> => {
  try {
    // Get contract events
    const contractEvents = await getContractEvents(CONTRACT_ID);

    // Decode events and check if account is whitelisted
    const decodedEvents = decodeEvents("WhiteListAccount", contractEvents);
    const checksumAddress = checkSumAddress(account);
    return decodedEvents.some((event) => event.accountId === checksumAddress);
  } catch (error) {
    console.error("Error checking whitelist status:", error);
    throw error;
  }
};

export default checkWhitelist;
