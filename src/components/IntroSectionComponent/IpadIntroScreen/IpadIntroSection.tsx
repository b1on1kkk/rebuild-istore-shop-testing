import { useState, useEffect } from "react";

import Intro from "../IntroJSXSection/Intro";
import { DataObject } from "../interfaces/IntroSectionInterfaces";

export default function IpadIntroSection(): JSX.Element {
  const [phoneData, getPhoneData] = useState<DataObject | null>(null);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/649f3c438e4aa6225eb72b12")
      .then((response) => response.json())
      .then((json) => getPhoneData(json))
      .finally(() => setLoadingScreen(false));
  }, []);

  return <Intro loadingScreen={loadingScreen} phoneData={phoneData}></Intro>;
}
