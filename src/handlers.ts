import { instance } from "./network/axios";

async function getWeatherData(
  country: string,
  setData: (data: any) => void,
  setIsLoading: (loading: boolean) => void,
  setError: (error: string) => void
): Promise<void> {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=6094982b48b145fc90e125039232108&q=${country}&days=3`;
  try {
    setError("");
    setIsLoading(true);
    const response = await instance.get(url);
    setData(response.data);
    console.log(response?.data?.forecast?.forecastday);
  } catch (error) {
    if (
      (error as any).response.data.error.message === "Parameter q is missing."
    )
      return;

    if (
      (error as any).response &&
      (error as any).response.data &&
      (error as any).response.data.error
    ) {
      setError((error as any).response.data.error.message);
    } else {
      setError("An unknown error occurred");
    }
  } finally {
    setIsLoading(false);
  }
}

export { getWeatherData };
