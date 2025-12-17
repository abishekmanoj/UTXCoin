import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Footer from './components/Footer.jsx'

import Home from "./pages/Home.jsx";
import BlockDetails from "./pages/BlockDetails.jsx";
import Pool from "./pages/TxPool.jsx";
import Wallet from "./pages/Wallet.jsx";
import Blockchain from "./pages/Blockchain.jsx";


export default function App() {
    return (
       <div className="bg-gray-950 min-h-screen text-white">
            <Navbar />
              <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blocks" element={<Blockchain />} />
                    <Route path="/block/:id" element={<BlockDetails />} />
                    <Route path="/pool" element={<Pool />} />
                    <Route path="/wallet" element={<Wallet />} />
                </Routes>
              </div>
            <Footer />
        </div>
    );
}
