import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import getMessage from "../Services/readStorage";
import { CONTRACT_ID } from "../Config/constants";

const Message = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const msg = await getMessage(CONTRACT_ID);
        setMessage(msg);
        setError(null);
      } catch (error) {
        setError("Error fetching message");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ marginTop: "1rem" }}>
      <Typography variant='h6'>Message</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant='body1' color='error'>
          Error: {error}
        </Typography>
      ) : (
        <Typography variant='body1' sx={{ whiteSpace: "pre-wrap" }}>
          <strong>The message is:</strong> {message}
        </Typography>
      )}
    </Container>
  );
};

export default Message;
