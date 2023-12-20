import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=806801d0f27985f95c058f4d955f3b74`
      );
      return response.data;
    } catch (error) {
      console.error("errorrr", error);
      throw error;
    }
  }
);

const initialState = {
  data: {},
  value: "Yerevan",
  radio: "C",
  dailyData: null,
  averageTemp: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.value = action.payload;
    },
    changeRadioValue(state, action) {
      state.radio = action.payload;
    },
    getDailyData(state, action) {
      const desiredDate = new Date(action.payload);
      const filteredData = state.data.list.filter(
        (prediction) =>
          new Date(prediction.dt * 1000).toDateString() ===
          desiredDate.toDateString()
      );

      state.dailyData = filteredData;
      state.averageTemp =
        filteredData.reduce(
          (sum, prediction) => sum + prediction.main.temp,
          0
        ) / filteredData.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.data = action.payload;
        state.error = true;
        state.loading = false;
      })
      .addCase(getWeather.pending, (state, action) => {
        state.data = action.payload;
        state.error = false;
        state.loading = true;
      });
  },
});

export const { changeValue, changeRadioValue, getDailyData } =
  weatherSlice.actions;
export default weatherSlice.reducer;
