// src/components/StockForm.jsx
import { useState, useContext } from 'react';
import { StockContext } from '../StockContext';

function StockForm () {
    const { stocks, setStocks } = useContext(StockContext);
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol) return;

        const newStock = { symbol, quantity: parseFloat(quantity), purchasePrice: parseFloat(purchasePrice) };
        setStocks([...stocks, newStock]);
        setSymbol('');
        setQuantity('');
        setPurchasePrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id="stockSymbol"
                name="stockSymbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Stock Symbol"
            />
            <input
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                type="number"
            />
            <input
                id="purchasePrice"
                name="purchasePrice"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="Purchase Price"
                type="number"
            />
            <button type="submit">Add Stock</button>
        </form>

    );
};

export default StockForm;