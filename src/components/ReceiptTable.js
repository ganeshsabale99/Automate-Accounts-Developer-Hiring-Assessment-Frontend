import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Modal,
  Box,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { deleteReceipt } from "../api";
import "./ReceiptTable.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ReceiptTable = ({ receipts, setReceipts }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenModal = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenModal(true);
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this receipt?"))
      return;

    setLoading(true);
    try {
      await deleteReceipt(fileId);
      setReceipts((prevReceipts) =>
        prevReceipts.filter((r) => r.id !== fileId)
      );
    } catch (error) {
      console.error("Error deleting receipt:", error);
    }
    setLoading(false);
  };

  return (
    <div className="receipt-container">
      <Typography variant="h5" align="center" className="table-title">
        📄 Receipts Data
      </Typography>

      {loading && (
        <div className="loader-overlay">
          <CircularProgress />
        </div>
      )}

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="header-row">
              <TableCell className="header-cell">ID</TableCell>
              <TableCell className="header-cell">Merchant Name</TableCell>
              <TableCell className="header-cell">Total Amount ($)</TableCell>
              <TableCell className="header-cell">Purchased At</TableCell>
              <TableCell className="header-cell">Created At</TableCell>
              <TableCell className="header-cell">Details</TableCell>
              <TableCell className="header-cell">Actions</TableCell>{" "}
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.length > 0 ? (
              receipts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((receipt) => (
                  <TableRow key={receipt.id} className="hover-row">
                    <TableCell>{receipt.id}</TableCell>
                    <TableCell>{receipt.merchant_name || "Unknown"}</TableCell>
                    <TableCell>${receipt.total_amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {receipt.purchased_at ? receipt.purchased_at : "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(receipt.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenModal(receipt)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(receipt.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500">
                  No receipts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination-container">
        <TablePagination
          component="div"
          count={receipts.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          onPageChange={handleChangePage}
        />
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" className="modal-title">
            Receipt Details
          </Typography>
          <Divider className="modal-divider" />
          {selectedReceipt && (
            <div className="modal-content">
              <p>
                <strong>ID:</strong> {selectedReceipt.id}
              </p>
              <p>
                <strong>Merchant Name:</strong>{" "}
                {selectedReceipt.merchant_name || "Unknown"}
              </p>
              <p>
                <strong>Total Amount:</strong> $
                {selectedReceipt.total_amount.toFixed(2)}
              </p>
              <p>
                <strong>Purchased At:</strong>{" "}
                {selectedReceipt.purchased_at || "N/A"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedReceipt.created_at).toLocaleString()}
              </p>
              <p>
                <strong>File Path:</strong> {selectedReceipt.file_path}
              </p>
            </div>
          )}
          <div className="modal-footer">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ReceiptTable;
