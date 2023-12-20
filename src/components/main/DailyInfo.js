import { useDispatch, useSelector } from "react-redux";
import { kelvinToCelsius, kelvinToFahrenheit } from "./WeatherApp";
import  css from './weahter.module.css'
export default function DailyInfo() {
  const dispatch = useDispatch();
  const { dailyData,radio,averageTemp,data } = useSelector((state) => state.weather);

console.log(dailyData,'dailyData');
  return (
  dailyData &&    <section className={css.oneDayInfoBox}>
      <article>
       <h3>
        {data?.city?.name}
       </h3>
       <h1>
       {radio==="C" ?`${kelvinToCelsius(averageTemp)}°C` :`${kelvinToFahrenheit(averageTemp)}°F` }
       </h1>

      </article>
      <article>
      <ul>
        {dailyData.map((prediction) => (
          <li key={prediction.dt}>
            {new Date(prediction.dt * 1000).toLocaleTimeString()}: {radio==="C" ?`${kelvinToCelsius(prediction.main.temp)}°C` :`${kelvinToFahrenheit(prediction.main.temp)}°F` }
          </li>
        ))}
      </ul>
        </article>
    </section>
  );
}
