"use client";

import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-black w-screen min-h-screen mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 title text-white">
        Portfolio Maker
      </h1>
      <div className=" p-8 rounded-lg shadow-lg title2 text-white">
        <h2 className="text-2xl font-semibold mb-4">
          Wanna Build Your Own Portfolio Website?
        </h2>
        <h5 className="text-gray-600 mb-4">
          Let&apos;s start <i className="fa fa-arrow-right"></i>
        </h5>
        <button className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Link href="/form">
            <p className="text-white">Click here</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
