import React from 'react';

const PriceDetailModal = ({ details, onClose }) => {
    if (!details) return null; // Eğer detay yoksa, modali kapat

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{details.instId} Detayları</h2>
                <button className="absolute top-3 right-3 text-red-500 text-2xl" onClick={onClose}>×</button>
                <div className="mt-4 space-y-2">
                    <p><strong>Son Fiyat:</strong> {details.last} USD</p>
                    <p><strong>24h Yüksek:</strong> {details.high24h} USD</p>
                    <p><strong>24h Düşük:</strong> {details.low24h} USD</p>
                    <p><strong>24h Hacim:</strong> {details.vol24h}</p>
              
                </div>
            </div>
        </div>
    );
};
export default PriceDetailModal;


