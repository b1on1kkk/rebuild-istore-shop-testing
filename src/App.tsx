import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PhonesIntroSection from "./components/IntroSectionComponent/IphoneIntroScreen/IphoneIntroSection";
import IpadIntroSection from "./components/IntroSectionComponent/IpadIntroScreen/IpadIntroSection";

import MainLayout from "./components/MainLayout/MainLayout";

import GetPhoneData from "./components/GetCurrentPhoneData/GetPhoneData";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout></MainLayout>}>
            <Route
              path="iphone"
              element={<PhonesIntroSection></PhonesIntroSection>}
            ></Route>
            <Route
              path="iphone/:data"
              element={<GetPhoneData></GetPhoneData>}
            ></Route>
            <Route
              path="ipad"
              element={<IpadIntroSection></IpadIntroSection>}
            ></Route>
            <Route
              path="ipad/:data"
              element={<GetPhoneData></GetPhoneData>}
            ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
