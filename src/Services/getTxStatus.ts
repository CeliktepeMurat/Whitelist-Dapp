import axios from "axios";
import { getFormattedTxId } from "./utils";
import { BASE_URL } from "../Config/constants";

const getTxStatus = async (txId: string): Promise<boolean> => {
  const formattedTxId = getFormattedTxId(txId);

  const url: string = `${BASE_URL}/transactions/${formattedTxId}`;

  try {
    const response = await axios.get(url);

    return response.data.transactions[0].result;
  } catch (error) {
    console.error("Error fetching transaction status:", error);
    throw error;
  }
};

export default getTxStatus;
