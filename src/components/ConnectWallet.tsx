import React, { useCallback, useState } from "react";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { Wallet as WalletIcon } from "@mui/icons-material";
import {
  useWallet,
  HWBridgeConnector,
} from "@buidlerlabs/hashgraph-react-wallets";

interface ConnectWalletProps {
  connector: HWBridgeConnector;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ connector }) => {
  const [loading, setLoading] = useState(false);
  const { extensionReady, isConnected, connect, disconnect } =
    useWallet(connector);

  const handleConnect = useCallback(async () => {
    setLoading(true);
    await connect();
    setLoading(false);
  }, [connect]);

  const handleDisconnect = useCallback(async () => {
    setLoading(true);
    await disconnect();
    setLoading(false);
  }, [disconnect]);

  return (
    <Box display='flex' alignItems='center'>
      <Tooltip
        title={extensionReady ? "Ready to connect" : "Extension not available"}>
        <Typography
          variant='subtitle1'
          sx={{
            marginRight: "1rem",
            fontWeight: 600,
            color: extensionReady ? "green" : "red",
          }}>
          Extension Status:{" "}
          <Typography
            component='span'
            variant='subtitle1'
            sx={{ fontWeight: 400 }}>
            {extensionReady ? "Ready" : "Unavailable"}
          </Typography>
        </Typography>
      </Tooltip>
      {isConnected ? (
        <IconButton onClick={handleDisconnect} color='secondary'>
          <Typography variant='body1'>Disconnect</Typography>
        </IconButton>
      ) : (
        <IconButton
          onClick={handleConnect}
          color='primary'
          disabled={loading}
          sx={{ marginRight: "1rem" }}>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <WalletIcon fontSize='large' />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default ConnectWallet;
