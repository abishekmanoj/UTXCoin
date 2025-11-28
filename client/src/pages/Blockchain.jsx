import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Blockchain() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const BLOCKS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blocks");

      const originalChain = response.data;  
      const reversedChain = [...originalChain].reverse(); 

      // Attach correct original block index to each entry
      const chainWithIndex = reversedChain.map((block, i) => {
        const correctIndex = originalChain.length - 1 - i;  
        return {
          ...block,
          blockNumber: correctIndex,   
        };
      });

      setBlocks(chainWithIndex);

    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-300 mt-10">
        Loading blockchain...
      </div>
    );
  }

  const totalPages = Math.ceil(blocks.length / BLOCKS_PER_PAGE);
  const start = (currentPage - 1) * BLOCKS_PER_PAGE;
  const currentBlocks = blocks.slice(start, start + BLOCKS_PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto pt-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-6">TXCoin Blockchain</h1>

      <div className="space-y-4">
        {currentBlocks.map((block, index) => (
          <Link
            to={`/block/${block.blockNumber}`}   
            key={block.blockNumber}
            className="block border border-gray-700 bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 transition"
          >
            <h2 className="text-xl font-semibold text-blue-300">
              Block #{block.blockNumber}
            </h2>

            <p className="text-gray-400 text-sm break-all">
              <strong>Hash:</strong> {block.hash}
            </p>

            <p className="text-gray-400 text-sm break-all">
              <strong>Last Hash:</strong> {block.lastHash}
            </p>

            <p className="text-gray-300 mt-2">
              <strong>Transactions:</strong> {block.data.length}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
        >
          Previous
        </button>

        <span className="text-gray-300">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
