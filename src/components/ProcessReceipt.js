import React, { useState } from 'react';
import { processReceipt } from '../api';
import { Button } from '@mui/material';

const ProcessReceipt = ({ fileId }) => {
    const [message, setMessage] = useState('');

    const handleProcess = async () => {
        try {
            const res = await processReceipt(fileId);
            setMessage(res.data.message);
        } catch (error) {
            setMessage('Processing failed');
        }
    };

    return (
        <div className="p-4">
            <Button variant="contained" color="success" onClick={handleProcess}>
                Process Receipt
            </Button>
            <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>
    );
};

export default ProcessReceipt;
