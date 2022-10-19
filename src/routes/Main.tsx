import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ComeApi } from "../api";

export default function Main() {
  function OK(position: any) {
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    Comapi(lat, lng);
  }
  function NO() {
    alert("Can't find you!");
  }

  useEffect(() => navigator.geolocation.getCurrentPosition(OK, NO), []);
  const [weather, setWeather] = useState([]);
  const [load, setLoad] = useState(true);
  const [allweather, setAllweather] = useState([]);
  async function Comapi(lat: number, lng: number) {
    const APIKEY = "77f56af5eb08aac7dc417ddf7b1a8ed3";
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
    );
    const json = await (await data.json()).list;
    const Jsonarr = json.filter(
      (item: any, index: number) => index === 5 || index % 8 === 5
    );

    setLoad(false);
    setAllweather(json);
    setWeather(Jsonarr);
    /* setLoad(false);
    setWeather(Jsonarr);*/
  }

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
        <Title>Goood Morning 6</Title>
      </Header>
      {load ? (
        <Loader>로딩중입니당</Loader>
      ) : (
        <WeatherList>
          {allweather.map((item: any, index: number) => {
            let Time = new Date(item.dt * 1000);
            let ReTime = `${
              Time.getMonth() + 1
            }월 ${Time.getDate()}일 ${Time.getHours()} 시 `;
            return index === 5 || index % 8 === 5 ? (
              <Weather key={index}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link
                    to={item.dt_txt}
                    state={{
                      index: index,
                      dt: item.dt,
                      temp: item.main.temp,
                      main: item.weather[0].description,
                    }}
                  >
                    <span>{ReTime}</span>
                    <IMG
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    />
                    {item.main.temp} 도
                  </Link>
                </div>
              </Weather>
            ) : null;
          })}
        </WeatherList>
      )}
    </Container>
  );
}

//useQuery는 콜백안에서 사용이안된다!!
