import { useState } from "react";
import { useQuery } from "react-query";
import { ComeApi } from "../api";
function OK(position: any) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
}
function NO() {
  alert("Can't find you!");
}
navigator.geolocation.getCurrentPosition(OK, NO);

export default function Main() {
  return <div>Main</div>;
}

//useQuery는 콜백안에서 사용이안된다!!
