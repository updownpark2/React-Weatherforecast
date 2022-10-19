import { useLocation, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Weather } from "../atom";
interface STATE {
  temp: number;
  main: string;
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

export default function Detail() {
  const { state } = useLocation();
  console.log(state.dt);
  console.log(state);
  const UNIX = new Date(state.dt * 1000);
  const UNIXRETURN = `${UNIX.getMonth()}월 ${UNIX.getDate()}일 하루 정보`;

  return (
    <Container>
      <Header>
        <Title>{UNIXRETURN}</Title>
      </Header>
    </Container>
  );
}
