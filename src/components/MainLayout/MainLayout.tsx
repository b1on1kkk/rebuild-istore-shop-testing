import { Outlet } from "react-router-dom";

import NavigationMenuBar from "../NavigationBarComponent/NavigationMenuBar";

export default function MainLayout(): JSX.Element {
  return (
    <>
      <NavigationMenuBar></NavigationMenuBar>
      <Outlet></Outlet>
    </>
  );
}
