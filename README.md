# 날씨 웹 사이트를 만들면서 배운점

## Theme

styled-component에서 제공하는 기능이다. 테마에 색상을 정리하여 필요할 때 해당 색상을 불러올 수 있다.

```js
export default function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <GlobalStyle />
            <Router />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
      //이런 식으로 ThemeProvider는 GlobalStyle 컴포넌트보다 상위에
      위치//하면된다.
    </>
  );
}
```

## styled.d.ts(declaration file)

theme용 interface라 생각하면 된다. 테마에 사용되는 색상의 type을 설명한다.

```js
import "styled-components";

// and extend them!
//이게 타입을 결국 알려주는거
declare module "styled-components" {
  export interface DefaultTheme {
    //여기가 내가 사용할 테마
    textColor: string;
    bgcolor: string;
    accentColor: string;
  }
}
```

## navigator.geolocation.getCurrentPosition(OK, NO)

navigator.geolocation.getCurrentPosition는 현재 사용자의 위치를 받아올 수 있는 함수
두 가지 인자를 받고 성공했을 때 실패했을 때 실행할 함수를 각각인자로 받는다.

## usequery()

useQuery를 사용하면서 오류를 만났다.

![image](https://user-images.githubusercontent.com/101778169/196338777-833d566b-2009-45e9-9385-d8fbd045d78c.png)

navigator.geolocation.getCurrentPosition(OK, NO)
에서 OK함수에 useQuery를 넣어 API를 불러오려 했지만 오류가 발생했다.

useQuery는 콜백함수로서 사용이 불가능 하다!!

오류를 발생시켰던 코드

```js
export default function Main() {
  useEffect(() => navigator.geolocation.getCurrentPosition(OK, NO), []);

  function OK(position: any) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const [isLoading, data] = useQuery(); //이렇게 사용이 불가능하다 인자로서 사용이 불가!
  }
  function NO() {
    alert("Can't find you!");
  }
}
```

그렇게해서 UseState를 사용해서 API의 데이터를 따로 저장해주었다.

```js
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

  }
```

### 이렇게 코드를 짰을 때 불리한점은 useQuery는 API 데이터를 캐시에 저장하여

### 다시 API를 부르지 않아도 바로 렌더링이 가능한데 수정된 코드는 다시 api를 불러오기까지 시간이 걸려 사용자가 화면을 보는데 더 시간이 걸린다.

## 오류를만남 (비동기처리)

### navigator.geolocation.getCurrentPosition(OK, NO) 는 비동기함수이다. 여기서 위도 경도를 받아야 API를 부를 수 있는데

위도 경도를 받은 후 useQuery를 실시하려고 하니 위도 경도가 null로 나온다.

![image](https://user-images.githubusercontent.com/101778169/196607670-67d4975d-2724-4ff4-8365-9fd9977f5fea.png)

## navigator.geolocation.getCurrentPosition 은 비동기함수로 위치가 담긴 객체를 반환한다.

비동기 함수를 다루기 위해 async await를 사용했다. 대신 async await는 프로미스 객체를 반환하는 메서드만 사용할 수 있기에 navigator.geolocation.getCurrentPosition을 프로미스 형태로 바꾸어주었다.

```js
const [data, setData] = useState < any > [];
function getlocation() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }); //성공했을 때 포지션을 반환한다.
}
async function Getd() {
  const res: any = await getlocation();
  const lat = res.coords.latitude;
  const lnt = res.coords.longitude;
  const APIKEY = "77f56af5eb08aac7dc417ddf7b1a8ed3";
  const APi = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lnt}&appid=${APIKEY}&units=metric`
    )
  ).json();
  setData(APi.list);
}

useEffect(() => {
  Getd();
}, []);
```
