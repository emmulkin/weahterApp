import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyData, getWeather } from "./weatherSlice";
import css from "./weahter.module.css";
import DailyInfo from "./DailyInfo";
import Loading from "../share/Loading";
export const kelvinToFahrenheit = (kelvin) =>
  Math.round((kelvin - 273.15) * (9 / 5) + 32);

export const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

export default function WeatherApp() {
  const dispatch = useDispatch();
  const [activeDay, setActiveDay] = useState(null);
  const { data, radio,loading } = useSelector((state) => state.weather);
  const [lastFiveDays, setLastFiveDays] = useState([]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${day}.${month}`;
  };

  const handleOneDayChange = (date) => {
    dispatch(getDailyData(date));
  };
  const handleActiveChange = (date) => {
    setActiveDay(date);
  };

  useEffect(() => {
    if (data?.list?.length > 0) {
    

      const calculateAverageTemperature = (list) => {
        const dailyTemperatures = {};

        list.forEach((item) => {
          const date = new Date(item.dt * 1000).toDateString();
          if (!dailyTemperatures[date]) {
            dailyTemperatures[date] = {
              temperatureSum: 0,
              count: 0,
            };
          }

          dailyTemperatures[date].temperatureSum += item.main.temp;
          dailyTemperatures[date].count += 1;
        });

        const averageTemperatures = Object.entries(dailyTemperatures).map(
          ([date, { temperatureSum, count }]) => ({
            date,
            averageTemperature: temperatureSum / count,
          })
        );
          
        return averageTemperatures;
      };

      const averageTemperatures = calculateAverageTemperature(data.list);
      dispatch(getDailyData(averageTemperatures[0].date));
      handleActiveChange(averageTemperatures[0].date)
      setLastFiveDays(averageTemperatures);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getWeather("yerevan"));
    
  }, [dispatch]);

  if(loading){
    return (
      <Loading/>
    )
  }
  if (!data) {
    return (
    <main>
 <h1 className={css.notFound}>City was not Found</h1>
 <h3 className={css.notFound}>Try again</h3>
    </main>
   );
  }

  console.log(lastFiveDays);
  return (
    <main className={css.weatherBox}>
      <DailyInfo />
      <section className={css.fiveDayBox}>
        {lastFiveDays?.length > 0 &&
          lastFiveDays.map(({ date, averageTemperature }) => {
            const isActive = activeDay === date;

            return (
              <article
                key={Math.random()}
                onClick={() => {
                  handleActiveChange(date);
                  handleOneDayChange(date)
                }}
                className={isActive ? css.activeDay : ''}
              >
                <h5>{formatDate(date)}</h5>
                <h2>
                  {radio === "C"
                    ? kelvinToCelsius(averageTemperature)
                    : kelvinToFahrenheit(averageTemperature)}
                  &deg;
                </h2>
              </article>
            );
          })}
      </section>
    </main>
  );
}
