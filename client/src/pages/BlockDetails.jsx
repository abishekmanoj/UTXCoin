import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BlockDetails() {
  const { id } = useParams();
  const [block, setBlock] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlock = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blocks");
      const originalChain = res.data;

      setBlock(originalChain[id]);
    } catch (err) {
      console.error("Error fetching block:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlock();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-300 mt-10">
        Loading block...
      </div>
    );
  }

  if (!block) {
    return (
      <div className="text-center text-red-400 mt-10">
        Block not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/blocks" className="text-blue-400 hover:text-blue-300 underline">
        ← Back to Blockchain
      </Link>

      <h1 className="text-4xl font-bold text-blue-400 mt-4 mb-4">
        Block #{id}
      </h1>

      {/* BLOCK INFO */}
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow max-w-full break-words">
        <p className="text-gray-300"><strong>Timestamp:</strong> {new Date(block.timestamp).toLocaleString()}</p>

        <p className="text-gray-300 break-all">
          <strong>Hash:</strong> {block.hash}
        </p>

        <p className="text-gray-300 break-all">
          <strong>Last Hash:</strong> {block.lastHash}
        </p>

        <p className="text-gray-300"><strong>Nonce:</strong> {block.nonce}</p>
        <p className="text-gray-300"><strong>Difficulty:</strong> {block.difficulty}</p>
      </div>

      <h2 className="text-2xl font-semibold text-blue-300 mt-6 mb-3">
        Transactions ({block.data.length})
      </h2>

      {block.data.length === 0 && (
        <p className="text-gray-400">No transactions in this block.</p>
      )}

      {/* TRANSACTION LIST */}
      <div className="space-y-4">
        {block.data.map((tx, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-700 p-5 rounded-lg shadow max-w-full break-words"
          >
            <h3 className="text-lg font-semibold text-blue-300">
              UTX #{i + 1}
            </h3>

            {/* SENDER */}
            <p className="text-gray-300 mt-3 break-all">
              <strong>Sender:</strong>{" "}
              {tx.input?.address || "Coinbase (Mining Reward)"}
            </p>

            {/* OUTPUTS */}
            <p className="text-gray-300 mt-4"><strong>Outputs:</strong></p>
            <ul className="ml-4 text-gray-400 space-y-1">
              {Object.entries(tx.outputMap).map(([address, amount], idx) => (
                <li key={idx} className="break-all">
                  {address}:{" "}
                  <span className="text-green-400 font-semibold">{amount}</span>
                </li>
              ))}
            </ul>

            {/* SIGNATURE */}
            {/* {tx.input?.signature && (
              <p className="text-gray-400 mt-4 text-sm break-all">
                <strong>Signature:</strong>{" "}
                {JSON.stringify(tx.input.signature).substring(0, 20) + '...'}
              </p>
            )} */}
          </div>
        ))}
      </div>

    </div>
  );
}
