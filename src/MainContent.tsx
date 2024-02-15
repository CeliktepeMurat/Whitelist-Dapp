import React, { useState } from "react";
import Whitelist from "./components/Whitelist";
import CheckWhitelist from "./components/CheckWhitelist";
import ConnectWallet from "./components/ConnectWallet";
import Message from "./components/Message";
import { HWBridgeConnector } from "@buidlerlabs/hashgraph-react-wallets";
import { Grid, Box, Tab, Tabs, Container, CssBaseline } from "@mui/material";

interface Props {
  connector: HWBridgeConnector;
}

const MainContent: React.FC<Props> = ({ connector }: Props) => {
  const [value, setValue] = useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case "one":
        return <Whitelist connector={connector} />;
      case "two":
        return <CheckWhitelist />;
      case "three":
        return <Message />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth='lg'>
      <CssBaseline />
      <Box sx={{ flexGrow: 2 }}>
        <Grid container>
          <Grid xs={8}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='secondary'
              indicatorColor='secondary'
              aria-label='secondary tabs example'>
              <Tab value='one' label='Whitelist' />
              <Tab value='two' label='Check Whitelist' />
              <Tab value='three' label='Message' />
            </Tabs>
            {renderTabContent()}
          </Grid>
          <Grid xs={4}>
            <ConnectWallet connector={connector} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MainContent;
