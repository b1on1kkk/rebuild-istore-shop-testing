import { useState, useEffect } from "react";

import Intro from "../IntroJSXSection/Intro";
import { DataObject } from "../interfaces/IntroSectionInterfaces";

export default function PhonesIntroSection(): JSX.Element {
  const [phoneData, getPhoneData] = useState<DataObject | null>(null);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/64958d9b9d312622a3745c0e")
      .then((response) => response.json())
      .then((json) => getPhoneData(json))
      .finally(() => setLoadingScreen(false));
  }, []);

  return <Intro loadingScreen={loadingScreen} phoneData={phoneData}></Intro>;
}
