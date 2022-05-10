import React, { useState } from "react";
import "../Components/Weather.css";
import axios from "axios";

export default function Weather() {
  const ApiKey = "0bd17813533221afe5a1da1a0e59fa1c";
  const [Data, setData] = useState({
    dataloaded: false,
    datas: [],
  });
  const [inputData, setinputData] = useState("");
  const getWeatherDetail = (cityName) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}`;
    axios
      .get(apiURL)
      .then((res) => {
        console.log(res.data);
        setData({ dataloaded: true, datas: res.data });
        // setData(res.data);
        console.log(Data);
      })
      .catch((err) => {
        console.log("error Occured", err);
      });
  };

  const handelChange = (e) => {
    setinputData(e.target.value);
    console.log("State:" + e.target.value);
  };
  const handelClick = () => {
    getWeatherDetail(inputData);
    setinputData("");
  };

  if (!Data.dataloaded) {
    return (
      <>
        <div className="fullBody">
          <div className="container">
            <div className="Input-Wrapper">
              <label>City</label>
              <input
                type="text"
                placeholder="Input City Name"
                value={inputData}
                onChange={handelChange}
              />
            </div>
            <div className="input-btn">
              <input
                type="button"
                className="btn btn-success"
                value="Search"
                onClick={handelClick}
              />
            </div>
            <div className="resultBody">
              <div className="col-sm-12 stateBody"></div>
              <div className="tempbody">
                <div className="col-sm-4">
                  <span>
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4"></div>
              </div>
              <div className="col-sm-12 humidity"></div>
              <div className="min-max">
                <div className="col-sm-6"></div>
                <div className="col-sm-6"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="fullBody">
        <div className="container">
          <div className="Input-Wrapper">
            <label>City</label>
            <input
              type="text"
              placeholder="Input City Name"
              value={inputData}
              onChange={handelChange}
            />
          </div>
          <div className="input-btn">
            <input
              type="button"
              className="btn btn-success"
              value="Search"
              onClick={handelClick}
            />
          </div>
          <div className="resultBody">
            <div className="col-sm-12 stateBody">
              <h4>{Data.datas?.name}</h4>
            </div>
            <div className="tempbody">
              <div className="col-sm-4">
                <span>
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <h6>Temp: {(Data?.datas.main?.temp - 273.15).toFixed(1)} C</h6>
              </div>
            </div>
            <div className="col-sm-12 humidity">
              <h6>Humidity: {Data?.datas.main?.humidity}%</h6>
            </div>
            <div className="min-max">
              <div className="col-sm-6">
                <h6>
                  Min-Temp: {(Data?.datas.main?.temp_min - 273.15).toFixed(1)} C
                </h6>
              </div>
              <div className="col-sm-6">
                <h6>
                  Max-Temp: {(Data?.datas.main?.temp_max - 273.15).toFixed(1)} C
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
