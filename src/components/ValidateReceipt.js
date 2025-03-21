import React, { useState } from 'react';
import { validateReceipt } from '../api';
import { Button } from '@mui/material';

const ValidateReceipt = ({ fileId }) => {
    const [message, setMessage] = useState('');

    const handleValidate = async () => {
        try {
            const res = await validateReceipt(fileId);
            setMessage(res.data.message);
        } catch (error) {
            setMessage('Validation failed');
        }
    };

    return (
        <div className="p-4">
            <Button variant="contained" color="secondary" onClick={handleValidate}>
                Validate Receipt
            </Button>
            <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>
    );
};

export default ValidateReceipt;
