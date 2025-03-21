import React, { useState } from 'react';
import { uploadReceipt } from '../api';
import { Button, CircularProgress } from '@mui/material';

const UploadReceipt = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('receipt', file);

        setLoading(true);
        try {
            const res = await uploadReceipt(formData);
            setMessage('File uploaded successfully!');
            onUploadSuccess(res.data.fileId);
        } catch (error) {
            setMessage('Upload failed');
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <input type="file" className="mb-2" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            <p className="text-sm text-gray-500 mt-2">{message}</p>
        </div>
    );
};

export default UploadReceipt;
