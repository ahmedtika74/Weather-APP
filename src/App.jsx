import "./App.css";
import { useState, useEffect } from "react";
import weather, { weatherByLocation } from "./api/weather";
import LiveData from "./components/LiveData";
import OverAllData from "./components/OverAllData";

function App() {
  const [city, setCity] = useState("Cairo");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!locationFetched) return;
      try {
        setError(false);
        const response = await weather(city);
        setData(response);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
    fetchData();
  }, [city, locationFetched]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setError(false);
            const { latitude, longitude } = position.coords;
            const response = await weatherByLocation(latitude, longitude);
            setData(response);
            setCity(response.city.name);
          } catch (error) {
            console.log(error);
            setError(true);
          }
          setLocationFetched(true);
        },
        (err) => {
          console.warn(err);
          setLocationFetched(true);
        },
      );
    }
  }, []);

  if (!data)
    return (
      <div className="flex h-screen w-full items-center justify-center text-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="mx-auto flex flex-col gap-10 p-5 text-white lg:max-w-[80%] xl:flex-row">
      <LiveData setCity={setCity} data={data} error={error} />
      <OverAllData data={data} />
    </div>
  );
}

export default App;
