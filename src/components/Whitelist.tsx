import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  HWBridgeConnector,
  useWallet,
} from "@buidlerlabs/hashgraph-react-wallets";
import { Signer } from "@hashgraph/sdk";
import whitelistAccount from "../Services/whitelistAccount";
import getTxStatus from "../Services/getTxStatus";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WhitelistProps {
  connector: HWBridgeConnector;
}

const Whitelist: React.FC<WhitelistProps> = ({ connector }) => {
  const [account, setAccount] = useState<string>("");
  const [txID, setTxID] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<boolean | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { signer } = useWallet(connector);

  const handleWhitelist = async () => {
    // Reset transactionStatus and txID
    setTransactionStatus(null);
    setTxID(null);
    setLoading(true);

    const txid = await whitelistAccount(account, signer as Signer);
    if (txid) {
      setTxID(txid);

      // After 7 seconds, fetch the transaction status
      setTimeout(async () => {
        try {
          const status = await getTxStatus(txid);
          console.log("Transaction status:", status);

          setTransactionStatus(status);
        } catch (error) {
          console.error("Error fetching transaction status:", error);
        } finally {
          setLoading(false);
        }
      }, 7000);
    } else {
      setLoading(false);
      toast.warning("Account is already whitelisted", {
        autoClose: 3000,
        closeOnClick: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Typography variant='h6'>Whitelist Account</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type='text'
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder='Enter account address'
            required
            fullWidth
            margin='normal'
            variant='standard'
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={handleWhitelist}>
            Whitelist
          </Button>
        </Grid>
        <Grid item xs={12}>
          {loading && <CircularProgress sx={{ marginTop: "1rem" }} />}
          {!loading && transactionStatus && txID && (
            <div>
              <Typography variant='body1' sx={{ marginTop: "1rem" }}>
                <strong>Transaction ID:</strong> {txID}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  marginTop: "1rem",
                  color: transactionStatus ? "green" : "red",
                  fontWeight: "bold",
                }}>
                <strong>Transaction Status:</strong>{" "}
                {transactionStatus ? "Success" : "Failed"}
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default Whitelist;
