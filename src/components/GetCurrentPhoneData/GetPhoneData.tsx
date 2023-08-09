// REACT-CREATE-APP
import { useParams } from "react-router-dom";
import React from "react";
import { useState, useEffect, useRef, MutableRefObject } from "react";
//
// SPINNER
import { MDBSpinner } from "mdb-react-ui-kit";
//
// ICONS
import return_arrow from "../../icons/7225798_arrow_return_icon.png";
//
// COLORS DATA
import decoded_colors from "../../phones_hex_color_data/decoded_colors";
//
// STYLES
import "./GetPhoneDataStyles.css";
//
// INTERFACES
import { RecordDKeys, PhoneColors, PhoneMemory } from "./interfaces/interfaces";
//
// UTILITIES
// Duplicate deleters
import DuplicateMemoryDeliter from "./utilites/DuplicateDeleters/DuplicateMemoryDeleter";
import DuplicateColorsDeleter from "./utilites/DuplicateDeleters/DuplicateColorsDeleter";
//
import RecheckingColors from "./utilites/RecheckingColors/RecheckColors";
// from larger to smaller main filter
import FilterFromLargerToSmaller from "./utilites/FromLargerToSmallerFilter/MaxMinFilter";
//
// price range sorting
import {
  ValidationPriceRange,
  FilterByPriceRange,
} from "./utilites/PriceRangeFiltering/ValidationAndFiltering";
//
// sorting by memory or color
import ProcessOfSortingData from "./utilites/SortingByColorMemory/SortingByColorMemory";
//
//
// COMPONENTS
import Input from "./utilites/inputComponent/InputComp";
import { ModalFilterWindow } from "./modalFilterWin/ModalFilterWindow";
//

export default function GetPhoneData(): JSX.Element {
  const getParams = useParams<string>().data;

  console.log(getParams);

  const [phoneColors, setPhoneColors] = useState<PhoneColors[]>([]);
  const [phoneMemoryAmount, setPhoneMemoryAmount] = useState<PhoneMemory[]>([]);
  const [filtered, setFiltered] = useState<RecordDKeys[]>([]);
  const [fromLargerToSmaller, setFromLargerToSmaller] =
    useState<boolean>(false);
  const [filterButton, setFilterButton] = useState<boolean>(false);

  const [warningText, setWarningText] = useState<string>("");
  const [correctFilteredData, setCorrectFilteredData] =
    useState<boolean>(false);

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const maxVal = useRef<number>(0);

  // first filtered copy that used only for reset sorting
  const firstFilteredCopy: MutableRefObject<RecordDKeys[]> = useRef([]);
  //
  // used for buff copy
  const filteredRefMass: MutableRefObject<RecordDKeys[]> = useRef([]);
  //
  // used for buff intermediate copies while sorting
  const intermediateRefMass: MutableRefObject<RecordDKeys[]> = useRef([]);
  //

  // chosen checkboxes (memory and color)
  const checkedBoxes: MutableRefObject<number[]> = useRef([]);
  const memoryCheckedBoxes: MutableRefObject<number[]> = useRef([]);

  const [closeOpenModalFilterWin, setCloseOpenModalFilterWin] =
    useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const pickData = await fetch(
        "https://api.jsonbin.io/v3/b/6495b5db8e4aa6225eb33205"
      );
      const data = await pickData.json();

      console.log(getParams);

      // get data from JSON API (up) after this filter our phones based on URL
      const filteredMass = data.record.filter((e: RecordDKeys) => {
        for (let i = 0; i < e.name.length; i++) {
          if (e.name[i] === ",") {
            if (e.name.slice(0, i).toLowerCase() === getParams!.toLowerCase()) {
              return e;
            }
            break;
          }
        }
        return 0;
      });

      // parse price from string to int
      filteredMass.map((e: RecordDKeys) => {
        if (typeof e.price === "string") {
          e.price = parseInt(e.price.slice(0, -4).replace(/\s+/g, ""));
          return e;
        }
        return 0;
      });

      // save copy of filtered mass that can be used
      filteredRefMass.current = filteredMass;
      //
      firstFilteredCopy.current = filteredMass;
      setFiltered(filteredMass);

      // getting max value of obj
      maxVal.current = Math.max(
        ...filteredMass.map((e: RecordDKeys) => e.price)
      );
      //

      // get all phone colors
      let AvailablePhoneColors = filteredMass.map((e: RecordDKeys) => {
        for (let i = e.name.length - 1; i >= 0; i--) {
          if (e.name[i] === ",") {
            return e.name.slice(i + 2, e.name.length);
          }
        }
        return 0;
      });
      //

      // delete dublicates from array and get obj with HEX color and color name
      const NoDublicatesPhoneColors = (function DuplicatesDeleter() {
        const buffArr = DuplicateColorsDeleter(
          RecheckingColors(getParams, AvailablePhoneColors)
        );

        const phoneColorsObj: PhoneColors[] = [];

        buffArr.map((color: string) => {
          for (let i = 0; i < Object.keys(decoded_colors).length; i++) {
            if (color === Object.keys(decoded_colors)[i]) {
              const colorHex =
                decoded_colors[color as keyof typeof decoded_colors];

              phoneColorsObj.push({
                type: "color",
                phoneHexColor: colorHex,
                colorName: color,
              });
            }
          }
          return 0;
        });

        return phoneColorsObj;
      })();
      setPhoneColors(NoDublicatesPhoneColors);
      //

      // get all memory phone data
      const AvailablePhoneMemory: PhoneMemory[] = filteredMass.map(
        (e: RecordDKeys) => {
          let [getFirstCommaInx, counter] = [0, 0];
          for (let i = 0; i < e.name.length; i++) {
            if (e.name[i] === ",") {
              counter += 1;
              if (counter === 2) {
                return {
                  type: "memory",
                  amountOfMemory: e.name.slice(getFirstCommaInx + 2, i),
                };
              }
              getFirstCommaInx = i;
            }
          }
          return 0;
        }
      );
      setPhoneMemoryAmount(DuplicateMemoryDeliter(AvailablePhoneMemory));
      //
    };

    getData();
  }, [getParams]);

  // filter checkboxes
  function Memory_Color_Filter(
    index: number,
    state: boolean,
    type: string,
    checkedBoxesType: MutableRefObject<number[]>
  ) {
    if (state) {
      if (type === "color") {
        checkedBoxes.current = [...checkedBoxesType.current, index];
      } else {
        memoryCheckedBoxes.current = [...checkedBoxesType.current, index];
      }
    } else {
      if (type === "color") {
        checkedBoxes.current = checkedBoxes.current.filter((numbers) => {
          return numbers !== index;
        });
      } else {
        memoryCheckedBoxes.current = memoryCheckedBoxes.current.filter(
          (numbers) => {
            return numbers !== index;
          }
        );
      }
    }

    if (type === "color") {
      if (checkedBoxes.current.length) {
        if (memoryCheckedBoxes.current.length) {
          ProcessOfSortingData(
            checkedBoxes,
            filtered,
            setFiltered,
            phoneColors
          );
        } else {
          intermediateRefMass.current = ProcessOfSortingData(
            checkedBoxes,
            filteredRefMass.current,
            setFiltered,
            phoneColors,
            intermediateRefMass.current
          );
        }
      } else {
        if (memoryCheckedBoxes.current.length) {
          setFiltered(intermediateRefMass.current);
        } else {
          setFiltered(filteredRefMass.current);
        }
      }
    } else {
      if (memoryCheckedBoxes.current.length) {
        if (checkedBoxes.current.length) {
          ProcessOfSortingData(
            memoryCheckedBoxes,
            filtered,
            setFiltered,
            phoneMemoryAmount
          );
        } else {
          intermediateRefMass.current = ProcessOfSortingData(
            memoryCheckedBoxes,
            filteredRefMass.current,
            setFiltered,
            phoneMemoryAmount,
            intermediateRefMass.current
          );
        }
      } else {
        if (checkedBoxes.current.length) {
          setFiltered(intermediateRefMass.current);
        } else {
          setFiltered(filteredRefMass.current);
        }
      }
    }
  }
  //////////////////////////////////////////////////////

  return (
    <div className="catalog-subcatalog">
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3 d-flex">
            <div className="right-col-wrapper">
              {/*  */}
              <div
                className="show-win-filters"
                onClick={() => {
                  setCloseOpenModalFilterWin(true);
                  document.body.style.overflow = "hidden";
                }}
              >
                Показать все фильтры
              </div>
              <ModalFilterWindow
                openCloseStatus={closeOpenModalFilterWin}
                openCloseSetter={setCloseOpenModalFilterWin}
              >
                <div className="main-filter-block-mobile">
                  <p className="phone-name">{getParams}</p>
                  <div className="filter-settings-wrapper">
                    <div className="filter-settings">
                      <div className="filter-block">
                        <div className="wrapper">
                          <p>Цена, руб.:</p>
                          <div className="inputs">
                            <input
                              placeholder="от"
                              pattern="[0-9]*"
                              value={from}
                              onChange={(e) =>
                                ValidationPriceRange(
                                  setFrom,
                                  e,
                                  setFilterButton
                                )
                              }
                              id="from"
                            ></input>
                            <input
                              placeholder="до"
                              pattern="[0-9]*"
                              value={to}
                              onChange={(e) =>
                                ValidationPriceRange(setTo, e, setFilterButton)
                              }
                              id="to"
                            ></input>
                          </div>
                          <>
                            {filterButton && (
                              <div className="to-filter-wrapper">
                                {correctFilteredData && (
                                  <div className="warning-block">
                                    {warningText}
                                  </div>
                                )}

                                <div className="filter-buttons-wrapper">
                                  <div
                                    className="to-filter-button"
                                    onClick={() =>
                                      FilterByPriceRange(
                                        from,
                                        to,
                                        setCorrectFilteredData,
                                        setWarningText,
                                        setFiltered,
                                        intermediateRefMass,
                                        filtered,
                                        maxVal
                                      )
                                    }
                                  >
                                    Фильтровать
                                  </div>
                                  <div
                                    className="return-button"
                                    onClick={() => {
                                      setFiltered(firstFilteredCopy.current);
                                      setFilterButton(false);
                                      setFrom("");
                                      setTo("");
                                    }}
                                  >
                                    <img
                                      src={return_arrow}
                                      alt="return"
                                      width={20}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                        <div className="wrapper">
                          <p>Цвет:</p>
                          <ul
                            style={
                              phoneColors.length === 0
                                ? {
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                  }
                                : {}
                            }
                          >
                            <>
                              {phoneColors.length === 0 ? (
                                <MDBSpinner className="m-5" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </MDBSpinner>
                              ) : (
                                <>
                                  {phoneColors.map((e, index) => {
                                    return (
                                      <li key={index}>
                                        <div className="color-block-wrapper">
                                          <div className="color-block">
                                            <div className="checkbox-wrapper">
                                              <Input
                                                index={index}
                                                checkBox={"color"}
                                                checkedBoxesType={checkedBoxes}
                                                onChangeFunc={
                                                  Memory_Color_Filter
                                                }
                                              ></Input>
                                            </div>
                                            <div className="color-name-wrapper">
                                              <div
                                                className="color-square"
                                                style={{
                                                  background: `${e.phoneHexColor}`,
                                                }}
                                              ></div>
                                              <div className="color-name">
                                                {e.colorName}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </>
                              )}
                            </>
                          </ul>
                        </div>
                        <div className="wrapper">
                          <p>Внутренняя память:</p>
                          <ul
                            style={
                              phoneMemoryAmount.length === 0
                                ? {
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                  }
                                : {}
                            }
                          >
                            <>
                              {phoneMemoryAmount.length === 0 ? (
                                <MDBSpinner className="m-5" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </MDBSpinner>
                              ) : (
                                <>
                                  {phoneMemoryAmount.map((e, index) => {
                                    return (
                                      <li key={e.amountOfMemory}>
                                        <div className="color-block-wrapper">
                                          <div className="color-block">
                                            <div className="checkbox-wrapper">
                                              <Input
                                                index={index}
                                                checkBox={"memory"}
                                                checkedBoxesType={
                                                  memoryCheckedBoxes
                                                }
                                                onChangeFunc={
                                                  Memory_Color_Filter
                                                }
                                              ></Input>
                                            </div>
                                            <div className="color-name-wrapper">
                                              <div className="color-name">
                                                {e.amountOfMemory}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </>
                              )}
                            </>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalFilterWindow>

              <div className="main-filter-block">
                <p className="phone-name">{getParams}</p>
                <div className="filter-settings-wrapper">
                  <div className="filter-settings">
                    <div className="filter-block">
                      <div className="wrapper">
                        <p>Цена, руб.:</p>
                        <div className="inputs">
                          <input
                            placeholder="от"
                            pattern="[0-9]*"
                            value={from}
                            onChange={(e) =>
                              ValidationPriceRange(setFrom, e, setFilterButton)
                            }
                            id="from"
                          ></input>
                          <input
                            placeholder="до"
                            pattern="[0-9]*"
                            value={to}
                            onChange={(e) =>
                              ValidationPriceRange(setTo, e, setFilterButton)
                            }
                            id="to"
                          ></input>
                        </div>
                        <>
                          {filterButton && (
                            <div className="to-filter-wrapper">
                              {correctFilteredData && (
                                <div className="warning-block">
                                  {warningText}
                                </div>
                              )}

                              <div className="filter-buttons-wrapper">
                                <div
                                  className="to-filter-button"
                                  onClick={() =>
                                    FilterByPriceRange(
                                      from,
                                      to,
                                      setCorrectFilteredData,
                                      setWarningText,
                                      setFiltered,
                                      intermediateRefMass,
                                      filtered,
                                      maxVal
                                    )
                                  }
                                >
                                  Фильтровать
                                </div>
                                <div
                                  className="return-button"
                                  onClick={() => {
                                    setFiltered(firstFilteredCopy.current);
                                    setFilterButton(false);
                                    setFrom("");
                                    setTo("");
                                  }}
                                >
                                  <img
                                    src={return_arrow}
                                    alt="return"
                                    width={20}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      </div>
                      <div className="wrapper">
                        <p>Цвет:</p>
                        <ul
                          style={
                            phoneColors.length === 0
                              ? {
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: "20px",
                                }
                              : {}
                          }
                        >
                          <>
                            {phoneColors.length === 0 ? (
                              <MDBSpinner className="m-5" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </MDBSpinner>
                            ) : (
                              <>
                                {phoneColors.map((e, index) => {
                                  return (
                                    <li key={index}>
                                      <div className="color-block-wrapper">
                                        <div className="color-block">
                                          <div className="checkbox-wrapper">
                                            <Input
                                              index={index}
                                              checkBox={"color"}
                                              checkedBoxesType={checkedBoxes}
                                              onChangeFunc={Memory_Color_Filter}
                                            ></Input>
                                          </div>
                                          <div className="color-name-wrapper">
                                            <div
                                              className="color-square"
                                              style={{
                                                background: `${e.phoneHexColor}`,
                                              }}
                                            ></div>
                                            <div className="color-name">
                                              {e.colorName}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </>
                            )}
                          </>
                        </ul>
                      </div>
                      <div className="wrapper">
                        <p>Внутренняя память:</p>
                        <ul
                          style={
                            phoneMemoryAmount.length === 0
                              ? {
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: "20px",
                                }
                              : {}
                          }
                        >
                          <>
                            {phoneMemoryAmount.length === 0 ? (
                              <MDBSpinner className="m-5" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </MDBSpinner>
                            ) : (
                              <>
                                {phoneMemoryAmount.map((e, index) => {
                                  return (
                                    <li key={e.amountOfMemory}>
                                      <div className="color-block-wrapper">
                                        <div className="color-block">
                                          <div className="checkbox-wrapper">
                                            <Input
                                              index={index}
                                              checkBox={"memory"}
                                              checkedBoxesType={
                                                memoryCheckedBoxes
                                              }
                                              onChangeFunc={Memory_Color_Filter}
                                            ></Input>
                                          </div>
                                          <div className="color-name-wrapper">
                                            <div className="color-name">
                                              {e.amountOfMemory}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </>
                            )}
                          </>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xxl-9 catalog-list-wrapper">
            <div className="sort-by-price-wrapper">
              <div className="sort-by-price-block">
                <div className="sort">
                  <p>
                    Сортировка:
                    <span
                      className="sorting-by"
                      onClick={() =>
                        FilterFromLargerToSmaller(
                          fromLargerToSmaller,
                          setFiltered,
                          filtered,
                          setFromLargerToSmaller
                        )
                      }
                    >
                      По цене ↑↓
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="catalog-list">
              <div className="row g-0">
                {/*  */}
                <>
                  {filtered.length === 0 ? (
                    <div className="spinner-wrapper">
                      <MDBSpinner className="m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  ) : (
                    filtered.map((e) => {
                      return (
                        <div
                          className="col-12 col-md-6 col-lg-4 iphone-card-wrapper"
                          key={e.id}
                        >
                          <div className="catalog-list-item">
                            <div className="comparison-block-wrapper">
                              <div className="comparison-button-wrapper">
                                <button>
                                  <svg
                                    _ngcontent-bax-c174=""
                                    width="26"
                                    height="26"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      _ngcontent-bax-c174=""
                                      d="M9.15568 21.713L8.05029 25.0097H18.7097L17.6043 21.713H9.15568Z"
                                    ></path>
                                    <path
                                      _ngcontent-bax-c174=""
                                      d="M0.879883 14.2955C0.879883 16.359 2.565 18.0318 4.64364 18.0318C6.72233 18.0318 8.40739 16.359 8.40739 14.2955H0.879883Z"
                                    ></path>
                                    <path
                                      _ngcontent-bax-c174=""
                                      d="M18.3525 14.2955C18.3525 16.359 20.0377 18.0318 22.1163 18.0318C24.195 18.0318 25.88 16.359 25.88 14.2955H18.3525Z"
                                    ></path>
                                    <path
                                      _ngcontent-bax-c174=""
                                      d="M4.64423 8.16788L6.5405 12.6472H8.33046L5.88814 6.87793H12.5564V20.0648H14.2047V6.87793H20.873L18.4307 12.6472H20.2206L22.1168 8.16788L24.013 12.6472H25.8031L22.6629 5.22957H14.2047V3.08544C14.6972 2.80038 15.0289 2.26818 15.0289 1.65812C15.0289 0.747736 14.2909 0.00976562 13.3805 0.00976562C12.4701 0.00976562 11.7322 0.747736 11.7322 1.65812C11.7322 2.26813 12.0638 2.80038 12.5564 3.08544V5.22957H4.09813L0.958008 12.6472H2.74802L4.64423 8.16788Z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                              <div className="comparison-button-wrapper">
                                <button>
                                  <svg
                                    _ngcontent-bax-c174=""
                                    width="27"
                                    height="26"
                                    viewBox="0 0 27 26"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ fill: "transparent" }}
                                  >
                                    <path
                                      _ngcontent-bax-c174=""
                                      d="M23.6994 4.0622L23.7044 4.06744L23.7094 4.0726C25.0429 5.42938 25.8797 7.23954 25.8797 9.13058C25.8797 11.052 25.1518 12.8103 23.7972 14.1886L13.4538 24.7129L3.11032 14.1886L3.10524 14.1834L3.10009 14.1783C1.76117 12.8549 1.02783 11.0604 1.02783 9.13058C1.02783 7.20921 1.75572 5.4509 3.11032 4.0726L3.1154 4.06744L3.1204 4.0622C4.4206 2.70035 6.17622 1.96094 8.05706 1.96094C9.77061 1.96094 11.4227 2.61897 12.7418 3.80327L13.4199 4.41206L14.0889 3.79326C15.3548 2.62231 17 1.96094 18.7627 1.96094C20.6435 1.96094 22.3992 2.70035 23.6994 4.0622Z"
                                      stroke="#BDBDBD"
                                      strokeWidth="2"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="item-picture">
                              <img src={e.picture} alt="iphone-logo"></img>
                            </div>
                            <div className="item-description">
                              <div className="item-info">
                                <p>{e.name}</p>
                              </div>
                            </div>
                            <div className="buttom-item-inf">
                              <div className="item-price-block">
                                <p>{e.price} BYN</p>
                              </div>
                              <div className="add-to-stock-buttom">
                                <div className="buttom">В корзину</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </>

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
