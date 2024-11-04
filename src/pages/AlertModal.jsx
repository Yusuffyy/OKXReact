import React from 'react';

const AlertModal = ({ onClose, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-80">
                <h2 className="text-lg font-bold mb-4">Dikkat!</h2>
                <p className="mb-4">{message}</p>
                <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={onClose}
                >
                    Kapat
                </button>
            </div>
        </div>
    );
};

export default AlertModal;
