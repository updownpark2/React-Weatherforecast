export async function ComeApi(lat: number, lng: number) {
  const APIKEY = "77f56af5eb08aac7dc417ddf7b1a8ed3";
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`
  ).then((res) => res.json());
}
