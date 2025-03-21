import React, { useState, useEffect } from "react";
import UploadReceipt from "./components/UploadReceipt";
import ValidateReceipt from "./components/ValidateReceipt";
import ProcessReceipt from "./components/ProcessReceipt";
import ReceiptTable from "./components/ReceiptTable";
import axios from "axios";
import { Container, Typography, Box, Paper } from "@mui/material";

function App() {
  const [fileId, setFileId] = useState(null);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/receipts")
      .then((res) => setReceipts(res.data))
      .catch((err) => console.error("Error fetching receipts:", err));
  }, [fileId]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} className="p-6 my-6 rounded-lg shadow-md bg-white">
        <Typography variant="h4" align="center" gutterBottom>
          📄 Receipt Processing System
        </Typography>

        <UploadReceipt onUploadSuccess={setFileId} />

        {fileId && (
          <Box className="flex justify-center space-x-4 my-4">
            <ValidateReceipt fileId={fileId} />
            <ProcessReceipt fileId={fileId} />
          </Box>
        )}

        <ReceiptTable receipts={receipts} />
      </Paper>
    </Container>
  );
}

export default App;
