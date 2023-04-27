import Head from "next/head";
import { useEffect, useState } from "react";
import LineChart from "../components/LineChart.js";
import DoughChart from "../components/DoughChart.js";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import Image from "next/image.js";

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
  const [appData, setAppData] = useState({
    countries: null,
    sources: null,
    views: null,
  });
  const [viewData, setViewData] = useState(null);
  const [countriesData, setCountriesData] = useState(null);
  const [sourcesData, setSourcesData] = useState(null);

  const images = [
    {
      name: "Nigeria",
      imageUrl: "http://flags.fmcdn.net/data/flags/mini/ng.png",
      color: "bg-blue-500",
    },
    {
      name: "Germany",
      imageUrl: "http://flags.fmcdn.net/data/flags/mini/de.png",
      color: "bg-red-500",
    },
    {
      name: "Ghana",
      imageUrl: "http://flags.fmcdn.net/data/flags/mini/gh.png",
      color: "bg-orange-500",
    },
    {
      name: "Finland",
      imageUrl: "http://flags.fmcdn.net/data/flags/mini/fi.png",
      color: "bg-yellow-500",
    },
    {
      name: "United Kingdom",
      imageUrl: "http://flags.fmcdn.net/data/flags/mini/gb.png",
      color: "bg-green-500",
    },
  ];
  useEffect(() => {
    axios.get("https://fe-task-api.mainstack.io/").then((response) => {
      const views = Object.keys(response.data.graph_data.views).map((key) => {
        return {
          labels: "",
          date: key,
          views: response.data.graph_data.views[key],
        };
      });
      setAppData({
        views: views,
        countries: response.data.top_locations.map((location) => {
          const image = images.find(
            (image) =>
              image.name.toLowerCase() === location.country.toLowerCase()
          );
          return {
            ...location,
            imageUrl: image.imageUrl,
            color: image.color,
          };
        }),
        sources: response.data.top_sources,
      });
    });
  });

  useEffect(() => {
    if (appData.countries !== null) {
      setCountriesData({
        labels: "",
        datasets: [
          {
            label: "Top Locations",
            data: appData.countries.map((data) => data.count),
            // width: 3,
            borderWidth: 0,
          },
        ],
      });
    }
  }, [appData.countries]);

  useEffect(() => {
    if (appData.sources !== null) {
      setSourcesData({
        labels: "",
        datasets: [
          {
            label: "Top Sources",
            data: appData.sources.map((data) => data.count),
            borderWidth: 0,
          },
        ],
      });
    }
  }, [appData.sources]);

  useEffect(() => {
    if (appData.views !== null) {
      const convertedData = appData.views.map((obj, index) => {
        return {
          id: index + 1, // add an id property with unique values
          date: obj.date,
          views: obj.views,
        };
      });

      setViewData({
        labels: convertedData.map((data) => data.date),
        datasets: [
          {
            label: "Page Views",
            data: convertedData.map((data) => data.views),
            borderColor: "#FF5403",
            borderWidth: 1.5,
            backgroundColor: "#FF5403",
            width: 10,
          },
        ],
      });
    }
  }, [appData.views]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: "Total Votes",
            font: {
              size: "10",
            },
            color: "#333333",
          },
          {
            text: "34",
            font: {
              size: "10",
            },
            color: "#333333",
          },
        ],
      },
    },
  };

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
            {viewData && <LineChart chartData={viewData} />}
          </div>

          <div className="grid gap-[16px] grid-cols-1 lg:grid-cols-2 mt-[24px] ">
            <div className="border rounded-[12px]  border-[#EFF1F6] px-10">
              <div className="flex justify-between py-2">
                <h2 className="font-bold">Top Locations</h2>
                <p className="text-[#FF5403] text-sm ">View full reports</p>
              </div>
              <div className="grid grid-cols-2 gap-6 items-center justify-between">
                <div>
                  {appData.countries &&
                    appData.countries.map((data) => {
                      return (
                        <>
                          <div className="flex items-center gap-1">
                            <div className="flex items-center py-2">
                              <Image
                                width={20}
                                height={15}
                                src={data.imageUrl}
                                className="rounded-sm"
                              />
                              <span className="text-sm leading-none pl-3">
                                {data.country}
                              </span>
                            </div>
                            <span>{data.percent}%</span>
                            <span
                              className={`w-2 h-2 rounded-full ${data.color}`}
                            />
                          </div>
                        </>
                      );
                    })}
                </div>

                {countriesData && (
                  <DoughChart chartData={countriesData} options={options} />
                )}
              </div>
            </div>
            <div className="border rounded-[12px] border-[#EFF1F6] px-10">
              <div className="flex justify-between py-2">
                <h2 className="font-bold">Top Locations</h2>
                <p className="text-[#FF5403] text-sm ">View full reports</p>
              </div>
              <div className="grid grid-cols-2 gap-6 items-center justify-between">
                <div>
                  {appData.sources &&
                    appData.sources.map((data) => {
                      return (
                        <div key={data.percent} className="flex">
                          <span className="mr-3 capitalize">{data.source}</span>
                          <span>{data.percent}%</span>
                        </div>
                      );
                    })}
                </div>
                {sourcesData && <DoughChart chartData={sourcesData} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
