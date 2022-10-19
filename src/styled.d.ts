// import original module declarations
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
