// src/App.jsx
import { StockProvider } from './StockContext';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import './styles.css';

function App () {
    return (
        <StockProvider>
            <div className="container">
                <h1 className="flashing">bLsH finance dashboard</h1>
                <StockForm />
                <h2>Stock List</h2>
                <StockList />
            </div>
            <footer>
                <p>&copy; 2024 bLsH INC. All rights reserved.</p>
            </footer>
        </StockProvider>
    );
};

export default App;