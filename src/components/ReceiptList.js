import React, { useEffect, useState } from 'react';
import { getReceipts } from '../api';

const ReceiptList = () => {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        getReceipts().then((res) => setReceipts(res.data)).catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Processed Receipts</h2>
            <ul className="list-disc ml-6">
                {receipts.map((receipt) => (
                    <li key={receipt.id}>
                        {receipt.merchant_name} - ₹{receipt.total_amount} ({receipt.purchased_at})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReceiptList;
