import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import { getWeatherData } from "./handlers";
import { ClipLoader } from "react-spinners";
import errorImage from "./assets/no-result-found.png";

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherData {
  current: {
    temp_c: number;
    condition: WeatherCondition;
    humidity: number;
    wind_mph: number;
  };
  location: {
    name: string;
    country: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: WeatherCondition;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: WeatherCondition;
      }>;
    }>;
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temp_c: 0,
      condition: { text: "", icon: "", code: 0 },
      humidity: 0,
      wind_mph: 0,
    },
    location: { name: "", country: "" },
    forecast: {
      forecastday: [
        {
          date: "",
          day: {
            maxtemp_c: 0,
            mintemp_c: 0,
            avgtemp_c: 0,
            condition: { text: "", icon: "", code: 0 },
          },
          hour: [],
        },
      ],
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("cairo");

  useEffect(() => {
    getWeatherData(searchQuery, setWeatherData, setIsLoading, setError);
  }, [searchQuery]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="text-white flex justify-center items-center  absolute h-screen w-screen bg-opacity-70 bg-black">
          <ClipLoader size={150} color="white" />
        </div>
      )}

      <div className=" bg-gradient-to-b from-[#bde8ff] to-white px-10 dark:from-[#253f63] dark:to-gray-400  md:h-screen">
        <div>
          <Header setSearchQuery={setSearchQuery} />
          {error ? (
            <div className="h-96 w-full flex flex-col justify-center items-center">
              <img src={errorImage} alt="" />
              <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                Sorry No result found :(
              </h2>
            </div>
          ) : (
            <div className="md:grid flex flex-col grid-cols-6 gap-5 text-blue-950 dark:text-white mt-10">
              <div className="col-span-4 flex flex-col gap-5">
                {/* Main Card */}
                <div className="bg-[#315e99] shadow-lg bg-opacity-30 gap-4  p-5 px-7 flex flex-col md:flex-row justify-between items-center rounded-3xl">
                  <div>
                    <img
                      src={weatherData.current.condition.icon}
                      alt="Weather condition"
                      width={120}
                    />
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-semibold">
                      {weatherData.location.name}
                    </h2>
                    <p className="font-medium">
                      {weatherData.location.country}
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-semibold">
                      {weatherData.current.temp_c} &deg;
                    </h2>
                    <p className="font-medium">Temperature</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-end">
                      <h3 className="text-3xl font-semibold">
                        {weatherData.current.humidity}
                      </h3>
                      <p className="font-medium">%</p>
                    </div>
                    <p className="font-medium">Humidity</p>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-end">
                      <h3 className="text-3xl font-semibold">
                        {weatherData.current.wind_mph}
                      </h3>
                      <p className="font-medium">Km/h</p>
                    </div>
                    <p className="font-medium">Wind Speed</p>
                  </div>
                </div>
                {/* Today's Forecast */}
                <div className="bg-[#315e99] shadow-lg bg-opacity-30 p-5 rounded-3xl">
                  <h2 className="font-bold mb-5 text-2xl">TODAY'S FORECAST</h2>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                    {weatherData.forecast.forecastday[0].hour
                      .filter(({ time }) => {
                        const hours = new Date(time).getHours();
                        return [3, 6, 9, 12, 15, 18].includes(hours);
                      })
                      .map(({ time, condition, temp_c }, index) => {
                        const formattedTime = new Date(time).toLocaleTimeString(
                          [],
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        );
                        const amPm = new Date(time)
                          .toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                          .split(" ")[1];
                        return (
                          <div
                            className="flex md:flex-col justify-between items-center md:gap-2"
                            key={index}
                          >
                            <p className="text-xl uppercase font-semibold">
                              {formattedTime} {amPm}
                            </p>
                            <img
                              src={condition.icon}
                              width={100}
                              alt="Weather icon"
                            />
                            <h2 className="text-xl font-semibold">
                              {temp_c}&deg;
                            </h2>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="bg-[#315e99] shadow-lg bg-opacity-30 p-5 rounded-3xl col-span-2 flex flex-col gap-5 mb-10 md:mb-0">
                <h2 className="font-bold mb-5 text-2xl">3 DAYS' FORECAST</h2>
                <div className="flex flex-col justify-between">
                  {weatherData.forecast?.forecastday.map(
                    ({ day, date }, index) => {
                      const dayName = new Date(date).toLocaleDateString([], {
                        weekday: "long",
                      });
                      return (
                        <div
                          className="flex items-center justify-between gap-2"
                          key={index}
                        >
                          <p className="text-xl font-semibold ">{dayName}</p>
                          <img
                            src={day.condition.icon}
                            width={100}
                            alt="Weather icon"
                          />
                          <h2 className="text-xl font-semibold">
                            {day.avgtemp_c} &deg;
                          </h2>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
