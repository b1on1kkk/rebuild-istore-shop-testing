import "./NavigationMenuStyles.css";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import search_icon from "../../icons/search_icon.png";

import GenerateSearchMenuBar from "./utilities/SearchMenuBarGenerator";

interface RecordDKeys {
  id: number;
  name: string;
  picture: string;
  price: number;
}

interface DataObject {
  record: RecordDKeys[];
  metadata: object;
}

export default function NavigationMenuBar(): JSX.Element {
  const [openSearchModalWin, setOpenSearchModalWin] = useState<boolean>(false);

  const [dataSearch, setDataSearch] = useState<string>("");

  const [allData, setAllData] = useState<DataObject | null>(null);

  const [seeMoreButton, setSeeMoreButton] = useState<boolean>(true);
  const [sizeShowTo, setSizeShowTo] = useState<number>(8);
  const [sizeShowFrom, setSizeShowFrom] = useState<number>(0);

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/6495b5db8e4aa6225eb33205")
      .then((response) => response.json())
      .then((json) => setAllData(json));
  }, []);

  const filteredItems = useMemo(() => {
    if (dataSearch !== "" && allData) {
      return allData?.record.filter((item) => {
        return item.name.toLowerCase().includes(dataSearch.toLowerCase());
      });
    } else {
      return allData?.record;
    }
  }, [allData, dataSearch]);

  useEffect(() => {
    if (filteredItems) {
      if (filteredItems.length === sizeShowTo) {
        setSeeMoreButton(false);
      } else if (filteredItems.length === 0) {
        setSeeMoreButton(false);
      } else {
        setSeeMoreButton(true);
      }
    }
  }, [filteredItems, sizeShowTo]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      setSizeShowTo(8);
      setSizeShowFrom(0);
    }
  }

  return (
    <div className="navigation-bar-wrapper">
      <div className="container-lg">
        <div
          className="search-button-wrapper"
          onClick={
            openSearchModalWin
              ? () => setOpenSearchModalWin(false)
              : () => setOpenSearchModalWin(true)
          }
        >
          <span>
            <img src={search_icon} alt="search-icon" width={20}></img>
          </span>
        </div>
        <div className={openSearchModalWin ? "search-modal-wrapper" : "hide"}>
          <div className="container-lg">
            <div className="search-modal">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Новый поиск..."
                  value={dataSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDataSearch(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  name="search-input"
                />

                <>
                  {dataSearch && filteredItems?.length !== 0 && (
                    <div className="search-bar-block">
                      <>
                        {GenerateSearchMenuBar(
                          filteredItems!,
                          sizeShowTo,
                          sizeShowFrom
                        )}
                      </>
                      <>
                        {seeMoreButton && (
                          <div
                            className="more-block"
                            onClick={() => {
                              if (sizeShowTo + 8 >= filteredItems!.length - 1) {
                                setSizeShowFrom(sizeShowTo);
                                setSizeShowTo(
                                  filteredItems!.length -
                                    sizeShowTo +
                                    sizeShowTo
                                );
                              } else {
                                setSizeShowFrom(sizeShowTo);
                                setSizeShowTo(sizeShowTo + 8);
                              }
                            }}
                          >
                            see more
                          </div>
                        )}
                      </>
                    </div>
                  )}
                </>
              </div>
              <div className="button-wrapper">
                <button>Найти</button>
              </div>
            </div>
          </div>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <Link to="iphone">
                <div className="text-wrapper">
                  <span className="text">iPhone</span>
                </div>
              </Link>

              <div className="text-modal-window">
                <ul className="text-modal-list">
                  <Link to="iphone/iPhone 14 Pro Max">
                    <li>iPhone 14 Pro Max</li>
                  </Link>
                  <Link to="iphone/iPhone 14 Pro">
                    <li>iPhone 14 Pro</li>
                  </Link>
                  <Link to="iphone/iPhone 14 Plus">
                    <li>iPhone 14 Plus</li>
                  </Link>
                  <Link to="iphone/iPhone 14">
                    <li>iPhone 14</li>
                  </Link>
                  <Link to="iphone/iPhone 13 Pro Max">
                    <li>iPhone 13 Pro Max</li>
                  </Link>
                  <Link to="iphone/iPhone 13 Pro">
                    <li>iPhone 13 Pro</li>
                  </Link>
                  <Link to="iphone/iPhone 13">
                    <li>iPhone 13</li>
                  </Link>
                  <Link to="iphone/iPhone 13 mini">
                    <li>iPhone 13 mini</li>
                  </Link>
                  <Link to="iphone/iPhone 12 Pro Max">
                    <li>iPhone 12 Pro Max</li>
                  </Link>
                  <Link to="iphone/iPhone 12 Pro">
                    <li>iPhone 12 Pro</li>
                  </Link>
                  <Link to="iphone/iPhone 12 mini">
                    <li>iPhone 12 mini</li>
                  </Link>
                  <Link to="iphone/iPhone 11 Pro Max">
                    <li>iPhone 11 Pro Max</li>
                  </Link>
                  <Link to="iphone/iPhone 11 Pro">
                    <li>iPhone 11 Pro</li>
                  </Link>
                  <Link to="iphone/iPhone 11">
                    <li>iPhone 11</li>
                  </Link>
                  <Link to="iphone/iPhone XR">
                    <li>iPhone XR</li>
                  </Link>
                  <Link to="iphone/iPhone XS Max">
                    <li>iPhone Xs Max</li>
                  </Link>
                  <Link to="iphone/iPhone SE Gen.2">
                    <li>iPhone SE Gen.2</li>
                  </Link>
                  <Link to="iphone/iPhone Xs">
                    <li>iPhone Xs</li>
                  </Link>
                  <Link to="iphone/iPhone X">
                    <li>iPhone X</li>
                  </Link>
                  <Link to="iphone/iPhone 8">
                    <li>iPhone 8</li>
                  </Link>
                  <Link to="iphone/iPhone 7">
                    <li>iPhone 7</li>
                  </Link>
                </ul>
              </div>
            </li>
            <li>
              <Link to="ipad">
                <div className="text-wrapper">
                  <span className="text">iPad</span>
                </div>
              </Link>
              <div className={"text-modal-window"}>
                <ul className="text-modal-list">
                  <Link to="ipad/iPad Pro 12.9">
                    <li>iPad Pro 12.9</li>
                  </Link>
                  <Link to="ipad/iPad Pro 11">
                    <li>iPad Pro 11</li>
                  </Link>
                  <Link to="ipad/iPad Air 5">
                    <li>iPad Air 5</li>
                  </Link>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
