import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import checkWhitelist from "../Services/checkWhitelist";
import { Bounce, ToastContainer, toast } from "react-toastify";

const CheckWhitelist: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);

  const handleCheckWhitelist = async () => {
    try {
      const result = await checkWhitelist(account);
      if (result) setIsWhitelisted(result);
      else
        toast.warning("Account is not whitelisted", {
          autoClose: 3000,
          closeOnClick: true,
          theme: "light",
          transition: Bounce,
        });
    } catch (error) {
      console.error("Error checking whitelist status:", error);
    }
  };

  return (
    <Container sx={{ marginTop: "3rem" }}>
      <Typography variant='h6'>Check Whitelist Status</Typography>
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
      <Button variant='contained' onClick={handleCheckWhitelist}>
        Check
      </Button>
      {isWhitelisted && (
        <Typography
          variant='body1'
          sx={{
            marginTop: "1rem",
            color: "green",
            fontWeight: "bold",
          }}>
          The account is whitelisted: {account}
        </Typography>
      )}
      <ToastContainer />
    </Container>
  );
};

export default CheckWhitelist;
