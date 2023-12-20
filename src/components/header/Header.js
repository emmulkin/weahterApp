import { useEffect } from "react";
import css from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeRadioValue, changeValue, getWeather } from "../main/weatherSlice";

export default function Header() {
  const dispatch = useDispatch();
  const { value, radio } = useSelector((state) => state.weather);

  const handleUnitChange = (e) => {
    dispatch(changeRadioValue(e.target.value));
  };

  const handleValueChange = (e) => {
    dispatch(changeValue(e.target.value));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeather(value))
  };
  useEffect(()=>{
    dispatch(getWeather(value))
    //eslint-disable-next-line
  },[radio,dispatch])

  return (
    <header>
      <div className={css.headerBox}>
        <form onSubmit={onSubmit}>
          <input value={value} onChange={handleValueChange} />
          <button>Search City</button>
        </form>
      </div>
      <div className={css.headerBox}>
        <div className={css.radioBox}>
          <label>
            <input
              onChange={handleUnitChange}
              name="tempUnit"
              type="radio"
              value='C'
              defaultChecked
            />
            &deg;C
          </label>

          <label>
            <input
              onChange={handleUnitChange}
              name="tempUnit"
              type="radio"
              value={'F'}
            />
            &deg; F
          </label>
        </div>
      </div>
    </header>
  );
}
