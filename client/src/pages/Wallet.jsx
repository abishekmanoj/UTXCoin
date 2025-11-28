import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";


export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);

  const fetchWallet = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/wallet-info");
      setWallet(res.data);
    } catch (err) {
      console.error("Error fetching wallet info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post("http://localhost:8000/api/transact", {
        recipient,
        amount: Number(amount),
      });

      setMessage({
        type: "success",
        text: "Transaction added to pool successfully!",
      });

      setRecipient("");
      setAmount("");

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Transaction failed.",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-300 mt-10">
        Loading wallet...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Your Wallet</h1>

      {/* Wallet Info */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow">
        <p className="text-xl text-gray-300">
          <strong>Address:</strong>
        </p>
        <p className="break-all text-blue-300 mb-3">{wallet.address}</p>

        <p className="text-xl text-gray-300 mt-3">
          <strong>Balance:</strong>{" "}
          <span className="text-green-400">{wallet.balance} TXC</span>
        </p>

        {/* QR Code */}
        <div className="mt-6 flex justify-center">
          <QRCodeCanvas
            value={wallet.address}
            size={160}
            bgColor="#111827"
            fgColor="#60a5fa"
            />
        </div>
      </div>

      {/* Send Transaction */}
      <h2 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
        Send Transaction
      </h2>

      {message && (
        <div
          className={`p-3 rounded mb-4 ${
            message.type === "success"
              ? "bg-green-800 text-green-200"
              : "bg-red-800 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-300 mb-1">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Amount (TXC)</label>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold transition"
        >
          Send Transaction
        </button>
      </form>
    </div>
  );
}
