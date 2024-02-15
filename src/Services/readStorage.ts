import axios from "axios";
import { BASE_URL } from "../Config/constants";
import { hexToString } from "./utils";

const SLOT = 2;

const getMessage = async (contractIdOrAddress: string): Promise<string> => {
  const url: string = `${BASE_URL}/contracts/${contractIdOrAddress}/state`;

  try {
    const response = await axios.get(url);
    const hexValue = response.data.state?.[SLOT - 1].value;

    if (!hexValue) {
      throw new Error("Hex value not found in response");
    }

    return hexToString(hexValue);
  } catch (error) {
    console.error("Error fetching contract status:", error);
    throw error;
  }
};

export default getMessage;
