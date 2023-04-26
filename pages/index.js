import Head from "next/head";
import { useState } from "react";
import { views, topLocations, topSources } from "../components/Data.js";
import LineChart from "../components/LineChart.js";
import DoughChart from "../components/DoughChart.js";
import { AiOutlineInfoCircle } from "react-icons/ai";

const filterButton = [
  { name: "1 Day" },
  { name: "3 Days" },
  { name: "7 Days" },
  { name: "30 Days" },
  { name: "All Time", current: true },
  { name: "Custom Date" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [viewData, setUserData] = useState({
    labels: views.map((data) => data.date),
    datasets: [
      {
        label: "Views",
        data: views.map((data) => data.views),
        borderColor: "#FF5403",
        borderWidth: 1,
      },
    ],
  });

  const [countriesData, setCountriesData] = useState({
    labels: topLocations.map((data) => data.country),
    datasets: [
      {
        label: "Top Locations",
        data: topLocations.map((data) => data.count),
      },
    ],
  });

  const [sourcesData, setSourcesData] = useState({
    labels: topSources.map((data) => data.source),
    datasets: [
      {
        label: "Top Sources",
        data: topSources.map((data) => data.count),
      },
    ],
  });

  return (
    <>
      <Head>
        <title>Mainstack Dashboard</title>
        <meta name="keywords" content="dashboard"></meta>
      </Head>
      <div>
        <nav className="bg-white px-[20px] lg:px-[60px] py-[12px] lg:py-[22px] ">
          <h1 className="text-xl leading-none lg:text-2xl font-bold  ">
            Dashboard
          </h1>
        </nav>
        <main className="px-[20px] lg:px-[60px] pb-10">
          <h2 className="text-lg py-2 lg:py-0 lg:text-2xl font-bold leading-none">
            Good morning, Blessing ⛅️
          </h2>
          <div className="flex items-center text-sm  justify-between bg-ed-500 lg:py-[10px] ">
            <span className="leading-none text-sm">
              Check out your dashboard summary.
            </span>
            <button className="text-[#FF5403] lg:text-[16px] lg:font-medium ">
              View analytics
            </button>
          </div>
          <div className="flex space-x-[5px] lg:space-x-[12px] my-[23px] ">
            {filterButton.map((button) => {
              return (
                <button
                  key={button.name}
                  className={classNames(
                    button.current
                      ? "border-[#FF5403] bg-orange-100  text-[#FF5403] text-[16px]"
                      : "text-[#31373D] hover:bg-orange-100 hover:border-[#FF5403] hover:text-[#FF5403] hover:font-bold",
                    "border-[1px] lg:px-[16px] lg:py-[12px] text-sm lg:font-bold cursor-pointer rounded-lg lg:rounded-full"
                  )}
                >
                  {button.name}
                </button>
              );
            })}
          </div>

          <div className="border rounded-[12px] border-[#EFF1F6] px-[12px] lg:px-[24px] py-[10px] lg:py-[30px] ">
            <div className="flex justify-between">
              <h3 className="text-[#131316]  font-bold pb-[8px]">Page Views</h3>
              <AiOutlineInfoCircle />
            </div>
            <p className="pb-[10px] lg:pb-[20px] leading-none">All time</p>
            <span className="font-extrabold text-[18px] lg:text-[48px] leading-none ">
              500
            </span>
            <LineChart chartData={viewData} />
          </div>
          <div className="grid gap-[16px] grid-cols-1 lg:grid-cols-2 mt-[24px] ">
            <div className="border rounded-[12px] border-[#EFF1F6]">
              <DoughChart chartData={countriesData} />
            </div>
            <div className="border rounded-[12px] border-[#EFF1F6]">
              <DoughChart chartData={sourcesData} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
