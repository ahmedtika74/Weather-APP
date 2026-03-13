import { useState } from "react";

const weatherImg = {
  "01d": "/clearskyday.png",
  "01n": "/clearskynight.png",
  "02d": "/cloudy.png",
  "02n": "/cloudy.png",
  "03d": "/cloudy.png",
  "03n": "/cloudy.png",
  "04d": "/cloudy.png",
  "04n": "/cloudy.png",
  "09d": "/showerrain.png",
  "09n": "/showerrain.png",
  "10d": "/rainday.png",
  "10n": "/rainnight.png",
  "11d": "/thunderstorm.png",
  "11n": "/thunderstorm.png",
  "13d": "/snow.png",
  "13n": "/snow.png",
  "50d": "/mist.png",
  "50n": "/mist.png",
};

export default function LiveData({ setCity, data, error }) {
  const [searchInput, setSearchInput] = useState("");

  const handleChangeCounrty = (e) => {
    if (e.key === "Enter") {
      setCity(searchInput);
      setSearchInput("");
    }
  };

  if (!data)
    return <div className="w-106.25 text-center text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-around gap-5 rounded-3xl bg-linear-to-b from-[#2D3035] to-[#1C1D21] p-5 xl:w-[30%]">
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleChangeCounrty}
        type="search"
        placeholder="Search city..."
        className="w-full rounded-[25px] bg-[#C2D4D3] px-5 py-2.5 text-gray-500 focus:outline-0"
      />
      {error && <p className="text-md text-red-500">Invalid city name!</p>}

      <div className="flex w-full flex-col items-center justify-around pb-5">
        <img
          src={weatherImg[data.list[0].weather[0].icon] || "cloudy.png"}
          className="w-37.5"
        />
        <p className="text-[96px] font-bold">
          {Math.round(data.list[0].main.temp)}°C
        </p>
        <div className="flex w-full items-center justify-around">
          <p>{data.city.name}</p>
          <p>
            {new Date(data.list[0].dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </p>
        </div>
      </div>
      <div className="h-px w-full bg-gray-500"></div>
      <div className="flex w-full flex-col gap-2.5">
        <p className="flex items-center gap-2">
          <img
            className="w-6"
            src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
          />
          {data.list[0].weather[0].description}
        </p>
        <p className="flex items-center gap-2">
          <img src="/min.png" /> Min Temperature -
          {Math.round(data.list[0].main.temp_min)}°C
        </p>
        <p className="flex items-center gap-2">
          <img src="/max.png" /> Max Temperature -
          {Math.round(data.list[0].main.temp_max)}°C
        </p>
      </div>

      <div className="flex w-full items-center justify-around gap-5 rounded-3xl bg-white/5 p-1 text-sm backdrop-blur-md">
        <div className="flex items-center justify-center gap-2.5">
          <img src="/Vector (Stroke).png" />
          <h5>
            <span className="block">{data.list[0].main.humidity}%</span>Humidity
          </h5>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <img src="/wind.png" />
          <h5>
            <span className="block">{data.list[0].wind.speed}km/h</span>Wind
            Speed
          </h5>
        </div>
      </div>
    </div>
  );
}
