export default function OverAllData({ data }) {
  const { list, city } = data;
  const fiveDaysData = list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return (
    <div className="flex flex-col justify-start gap-8 rounded-3xl bg-linear-to-b from-[#2D3035] to-[#1C1D21] p-10">
      <div className="flex flex-wrap items-center justify-center gap-6 xl:items-start">
        {fiveDaysData.map((day) => (
          <div
            key={day.dt}
            className="flex min-w-30 flex-col items-center rounded-2xl bg-white/5 p-4"
          >
            <p className="font-bold text-white">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-12"
            />
            <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-1 items-center justify-around gap-5 border-t border-gray-500 pt-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-white/5 p-4">
          <img src="/feels.png" alt="feels like" className="w-12" />
          <p className="flex flex-col">
            <span className="text-gray-400">Feels Like</span>
            <span>{list[0].main.feels_like}°C</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-white/5 p-4">
          <img src="/pressure.png" alt="pressure" className="w-12" />
          <p className="flex flex-col">
            <span className="text-gray-400">Pressure</span>
            <span>{list[0].main.pressure}</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-white/5 p-4">
          <img src="/sunrise.png" alt="sunrise" />
          <p className="flex flex-col">
            <span className="text-gray-400">Sunrise</span>
            <span>
              {new Date(city.sunrise * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-10 rounded-2xl bg-white/5 p-4">
          <img src="/Sunset.png" alt="sunset" />
          <p className="flex flex-col">
            <span className="text-gray-400">Sunset</span>
            <span>
              {new Date(city.sunset * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
