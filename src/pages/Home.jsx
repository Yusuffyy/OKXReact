import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import PriceDetailModal from './PriceDetailModal'; // Detay modalı
import AlertModal from './AlertModal'; // Uyarı modalı

const Home = () => {
    const [prices, setPrices] = useState({});
    const [showPriceDetailModal, setShowPriceDetailModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7146/priceHub") // API URL'si
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("SignalR bağlantısı başarıyla kuruldu.");
            })
            .catch((err) => {
                console.error("SignalR bağlantısı kurulamadı:", err);
            });

        connection.on("ReceivePriceUpdate", (data) => {
            setPrices(prevPrices => ({
                ...prevPrices,
                [data.instId]: data // Verileri güncelle
            }));
        });

        return () => {
            connection.stop();
        };
    }, []);

    const handleCoinClick = (symbol) => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            setShowAlertModal(true);
            setTimeout(() => {
                window.location.href = '/login';
            }, 10000);
        } else {
            const coinDetails = prices[symbol];
            setSelectedCoin(coinDetails);
            setShowPriceDetailModal(true);
        }
    };

    const closePriceDetailModal = () => {
        setShowPriceDetailModal(false);
    };

    const closeAlertModal = () => {
        setShowAlertModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-6">Kripto Para Fiyatları</h1>
            <div className="bg-white shadow-md rounded-lg w-full max-w-md">
                <div className="flex justify-between bg-blue-600 text-white p-4 rounded-t-lg">
                    <h2 className="font-bold">Coin</h2>
                    <h2 className="font-bold">Son Fiyat</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                    {Object.entries(prices).map(([symbol, details]) => (
                        <li key={symbol} className="flex justify-between p-4 hover:bg-blue-100 cursor-pointer" onClick={() => handleCoinClick(symbol)}>
                            <span className="text-lg font-medium">{symbol}</span>
                            <span className="text-lg text-green-600">{details.last} USD</span>
                        </li>
                    ))}
                </ul>
            </div>
            {showPriceDetailModal && <PriceDetailModal details={selectedCoin} onClose={closePriceDetailModal} />}
            {showAlertModal && (
                <AlertModal 
                    onClose={closeAlertModal}
                    message="Detayları görebilmek için giriş yapmanız gerekmektedir. 10 saniye sonra giriş yap sayfasına yönlendirileceksiniz."
                />
            )}
        </div>
    );
};

export default Home;
