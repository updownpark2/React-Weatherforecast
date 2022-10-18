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
      </ThemeProvider>//이런 식으로 ThemeProvider는 GlobalStyle 컴포넌트보다 상위에 위치//하면된다.
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
