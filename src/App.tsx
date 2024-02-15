import React from "react";
import { HWBridgeProvider } from "@buidlerlabs/hashgraph-react-wallets";
import { HashpackConnector } from "@buidlerlabs/hashgraph-react-wallets/connectors";
import { METADATA, NETWORK } from "./Config/constants";
import MainContent from "./MainContent";

const App: React.FC = () => {
  return (
    <HWBridgeProvider
      network={NETWORK}
      metadata={METADATA}
      connectors={[HashpackConnector]}
      multiSession={false}
      defaultConnector={HashpackConnector}>
      <MainContent connector={HashpackConnector} />
    </HWBridgeProvider>
  );
};

export default App;
