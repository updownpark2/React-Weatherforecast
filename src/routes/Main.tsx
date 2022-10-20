import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ComeApi } from "../api";

export default function Main() {
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
  return <div>asd</div>;
}

//useQuery는 콜백안에서 사용이안된다!!
