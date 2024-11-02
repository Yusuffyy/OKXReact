import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7146/priceHub") // API URL'nizi doğru şekilde ayarlayın
            .withAutomaticReconnect()
            .build();

        // SignalR bağlantısını başlat
        connection.start()
            .then(() => {
                console.log("SignalR bağlantısı başarıyla kuruldu.");
            })
            .catch((err) => {
                console.error("SignalR bağlantısı kurulamadı:", err);
            });

        // Fiyat güncellemelerini dinle
        connection.on("ReceivePriceUpdate", (data) => {
            setPrices(prevPrices => ({
                ...prevPrices,
                [data.symbol]: data.price
            }));
        });

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div>
            <h1>Kripto Para Fiyatları</h1>
            <ul>
                {Object.entries(prices).map(([symbol, price]) => (
                    <li key={symbol}>
                        {symbol}: {price} USD
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
