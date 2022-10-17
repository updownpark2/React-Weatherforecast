export async function ComeApi(lat: number, lon: number) {
  return await fetch(
    `api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=66735d4195a98721601ba50bc34a88c3`
  );
}
