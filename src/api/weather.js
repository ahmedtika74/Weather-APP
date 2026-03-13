import axios from "axios";

export default async function weather(city) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b185f0bb51ab21a4aa0cbeae9620a3fe&units=metric`,
  );
  return response.data;
}

export async function weatherByLocation(lat, lon) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b185f0bb51ab21a4aa0cbeae9620a3fe&units=metric`,
  );
  return response.data;
}
