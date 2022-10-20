import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ComeApi } from "../api";
import { WeatherRecoil } from "../atom";

export default function Main() {
  const [weather, setWeather] = useRecoilState<any>(WeatherRecoil);
  const [load, setLoad] = useState(true);
  function fetchWeather() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function fetchWeaterApi() {
    const data: any = await fetchWeather();
    const lat = await data.coords.latitude;
    const lng = await data.coords.longitude;
    const APIKEY = "77f56af5eb08aac7dc417ddf7b1a8ed3";
    const weatherList = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
      )
    ).json();
    setWeather(weatherList.list); //Recoil 넣으면 더 좋을거같은데
    setLoad(false);
  }

  useEffect(() => {
    fetchWeaterApi();
  }, []); //한번만부르기

  const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
  `;

  const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  `;

  const WeatherList = styled.ul`
    margin-top: 20px;
  `;

  const Weather = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 40px;
    padding: 20px;
    border-radius: 15px;
    a {
      transition: color 0.2s ease-in;
      display: flex;
      align-items: center;
    }
    &:hover {
      a {
        color: ${(props) => props.theme.accentColor};
      }
    }
  `;

  const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 300;
  `;

  const Loader = styled.span`
    text-align: center;
  `;

  const IMG = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
  `;

  //return은 마지막에 이루어지니까 걱정마라
  return (
    <Container>
      <Header>
        <Title>날씨예보☂️</Title>
      </Header>
      <WeatherList>
        {load ? (
          <Loader>비가오려나☂️</Loader>
        ) : (
          weather.map((item: any, index: number) =>
            index === 4 || index % 8 === 4 ? (
              <Weather key={item.dt}>
                <Link to={`/${item.dt}`} state={index}>
                  {`${new Date(item.dt * 1000).getMonth() + 1}월 ${new Date(
                    item.dt * 1000
                  ).getDate()}일 ${new Date(item.dt * 1000).getHours()}시`}
                  <IMG
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  />
                </Link>
              </Weather>
            ) : null
          )
        )}
      </WeatherList>
    </Container>
  );
}

//useQuery는 콜백안에서 사용이안된다!!
