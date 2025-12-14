import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Pool() {
  const [pool, setPool] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchPool = async () => {
    try {
      const res = await api.get("/api/tx-pool-map");
      setPool(res.data);
    } catch (err) {
      console.error("Error fetching TX pool:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPool();
  }, []);

  const mineTransactions = async () => {
    try {
      await api.get("/api/mine-txs");
      navigate("/blocks"); 
    } catch (err) {
      console.error("Error mining transactions:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 text-xl mt-10">
        Loading transaction pool...
      </div>
    );
  }

  const txKeys = Object.keys(pool);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">Transaction Pool</h1>

      {txKeys.length === 0 && (
        <p className="text-gray-400">No pending transactions in the pool.</p>
      )}

      <div className="space-y-6">
        {txKeys.map((txId, index) => {
          const tx = pool[txId];

          return (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 p-5 rounded-lg shadow max-w-full break-words"
            >
              <h2 className="text-xl font-semibold text-blue-300">
                Transaction #{index + 1}
              </h2>

              {/* Sender */}
              <p className="text-gray-300 mt-3 break-all">
                <strong>Sender:</strong>{" "}
                {tx.input?.address || "Coinbase (Mining Reward)"}
              </p>

              {/* Outputs */}
              <p className="text-gray-300 mt-4"><strong>Outputs:</strong></p>
              <ul className="ml-4 text-gray-400">
                {Object.entries(tx.outputMap).map(([address, amount], idx) => (
                  <li key={idx} className="break-all">
                    {address}:{" "}
                    <span className="text-green-400 font-semibold">{amount}</span>
                  </li>
                ))}
              </ul>

              {/* Signature */}
              {/* {tx.input?.signature && (
                <p className="text-gray-400 mt-4 text-sm break-all">
                  <strong>Signature:</strong>{" "}
                  {JSON.stringify(tx.input.signature)}
                </p>
              )} */}
            </div>
          );
        })}
      </div>

      {/* Mine button */}
      {txKeys.length > 0 && (
        <button
          onClick={mineTransactions}
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-lg font-semibold"
        >
          Mine All Transactions
        </button>
      )}
    </div>
  );
}
