import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "./routes/Detail";
import Main from "./routes/Main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:detail" element={<Detail />}></Route>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
