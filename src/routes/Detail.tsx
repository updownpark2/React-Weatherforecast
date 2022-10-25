import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { WeatherRecoil } from "../atom";
interface STATE {
  temp: number;
  main: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
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

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Title = styled.h1`
  font-size: 32px;
  color: white;
  font-weight: 400;
`;

const Loader = styled.span`
  text-align: center;
`;
const IMG = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const Button = styled.button`
  background-color: yellow;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 7px;
`;

export default function Detail() {
  const { state } = useLocation();
  const filterdWeather = useRecoilValue<any>(WeatherRecoil).filter(
    (item: any, index: number) => state - 3 <= index && index <= state + 4
  );

  return (
    <Container>
      <Header>
        <Link to={`/`}>
          <Button>뒤로가기!</Button>
        </Link>{" "}
        <Title>☀️</Title>
      </Header>

      <WeatherList>
        {filterdWeather.map((item: any, index: number) => (
          <Weather key={index}>
            {`${new Date(item.dt * 1000).getMonth() + 1}월 ${new Date(
              item.dt * 1000
            ).getDate()}일 ${new Date(item.dt * 1000).getHours()}시  날씨 :${
              item.weather[0].description
            } 온도:${item.main.temp} 도씨 바람속도 : ${
              item.wind.speed
            } 미터퍼세크`}{" "}
          </Weather>
        ))}
      </WeatherList>
    </Container>
  );
}
