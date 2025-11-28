import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">

      {/* Glow circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-900/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-900/30 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
          Welcome to TXCoin
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed">
          A decentralized blockchain network built from scratch.
          Explore blocks, view live transactions, inspect wallets,
          and visualize your very own blockchain in real-time.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <Link
            to="/blocks"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Explore Blockchain
          </Link>

          <Link
            to="/wallet"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg font-semibold transition shadow-lg border border-gray-600"
          >
            View Wallet
          </Link>
        </div>

        {/* Features section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-300">Live Blockchain</h3>
            <p className="text-gray-400 mt-2">
              Inspect blocks, view transactions, and understand how your chain grows.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-300">Transaction Pool</h3>
            <p className="text-gray-400 mt-2">
              View unconfirmed transactions and mine them into new blocks instantly.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-300">Wallet & Balance</h3>
            <p className="text-gray-400 mt-2">
              Check your wallet balance, send transactions, and generate a QR code.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
