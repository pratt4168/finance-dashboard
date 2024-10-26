// src/components/StockList.jsx
import { useContext, useEffect, useState } from 'react';
import { StockContext } from '../StockContext';
import { fetchCurrentPrice } from '../utils/fetchCurrentPrice';

function StockList() {
    const { stocks, setStocks } = useContext(StockContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const updatePrices = async () => {
            try {
                const updatedStocks = await Promise.all(stocks.map(async (stock) => {
                    const currentPrice = await fetchCurrentPrice(stock.symbol);
                    if (currentPrice === null) {
                        throw new Error(`Failed to fetch price for ${stock.symbol}`);
                    }
                    return {
                        ...stock,
                        currentPrice,
                        profitLoss: (currentPrice - stock.purchasePrice) * stock.quantity,
                    };
                }));
                setStocks(updatedStocks);
                setError(null); // Clear any existing errors
            } catch (err) {
                setError(err.message);
            }
        };

        updatePrices();
    }, [stocks, setStocks]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (stocks.length === 0) {
        return <p>No stocks available.</p>;
    }

    return (
        <ul>
            {stocks.map((stock, index) => (
                <li key={index}>
                    <p>Symbol: {stock.symbol}</p>
                    <p>Quantity: {stock.quantity}</p>
                    <p>Purchase Price: ${stock.purchasePrice}</p>
                    <p>Current Price: ${stock.currentPrice}</p>
                    <p style={{ color: stock.profitLoss >= 0 ? 'greenyellow' : 'red' }}>
                        Profit/Loss: ${stock.profitLoss}
                    </p>
                </li>
            ))}
        </ul>
    );
}

export default StockList;