import Web3 from "web3";
import ABI from "../Config/ABI";

const web3 = new Web3();

export const decodeEvents = (eventName: string, logs: any[]): any[] => {
  const eventAbi: any = ABI.find(
    (event: any) => event.name === eventName && event.type === "event"
  );
  if (!eventAbi) {
    throw new Error(`Event ABI not found for event: ${eventName}`);
  }

  return logs.map((log) =>
    web3.eth.abi.decodeLog(eventAbi.inputs, log.data, log.topics)
  );
};

export const checkSumAddress = (address: string): string => {
  return web3.utils.toChecksumAddress(address);
};

export const getFormattedTxId = (txId: string): string => {
  const [shardRealmNum, sssNnn] = txId.split("@");

  const [seconds, nanoseconds] = sssNnn.split(".");

  const formattedTxId = `${shardRealmNum}-${seconds}-${nanoseconds}`;

  return formattedTxId;
};

export const hexToString = (hex: string): string => {
  return Buffer.from(hex.slice(2), "hex").toString("ascii");
};
