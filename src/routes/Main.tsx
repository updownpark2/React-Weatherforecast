import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

export default function Main() {
  useEffect(() => navigator.geolocation.getCurrentPosition(OK, NO), []);

  const [weather, setWeather] = useState([]);
  const [load, setLoad] = useState(false);
  const [time, setTime] = useState([]);
  console.log(useRecoilValue);

  function OK(position: any) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    Comapi(lat, lng);
  }
  function NO() {
    alert("Can't find you!");
  }

  async function Comapi(lat: number, lng: number) {
    const APIKEY = "77f56af5eb08aac7dc417ddf7b1a8ed3";
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
    );
    const json = await (await data.json()).list;
    const Time = json
      .map((item: any, index: number) => item.dt)
      .filter((item: any, index: number) => index % 3 === 0)
      .map((item: any) => {
        let What = new Date(item * 1000);
        return `${
          What.getMonth() + 1
        }월 ${What.getDate()}일 ${What.getHours()} : ${What.getMinutes()}`;
      });

    setLoad(true);
    setWeather(json);
    setTime(Time);
  }
  const Box = styled.div``;

  const Header = styled.h1`
    font-size: 48px;
  `;
  const UL = styled.ul``;

  const LI = styled.li`
    margin-top: 10px;
  `;
  const Load = styled.div`
    font-size: 32px;
  `;
  return (
    //return은 마지막에 이루어지니까 걱정마라
    <Box>
      <Header>15 To 3 날씨 예보</Header>
      {load ? (
        <UL>
          {time.map((item, index) => (
            <LI key={index}>{item}</LI>
          ))}
          {weather.map((item: any, index: number) => (
            <LI key={index}>{item.main.temp}</LI>
          ))}
        </UL>
      ) : (
        <Load>로딩중입니다</Load>
      )}
    </Box>
  );
}

//useQuery는 콜백안에서 사용이안된다!!
