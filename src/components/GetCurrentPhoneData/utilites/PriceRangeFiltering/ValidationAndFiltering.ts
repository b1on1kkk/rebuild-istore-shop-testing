import { RecordDKeys } from "../../interfaces/interfaces";

function ValidationPriceRange(
  setter: React.Dispatch<React.SetStateAction<string>>,
  e: React.ChangeEvent<HTMLInputElement>,
  filterButtonSetter: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (e.target.validity.valid) {
    filterButtonSetter(true);
    setter(e.target.value);
  }
}

function FilterByPriceRange(
  valFrom: string,
  valTo: string,
  checkingIfDataCorrect: React.Dispatch<React.SetStateAction<boolean>>,
  warningTextSetter: React.Dispatch<React.SetStateAction<string>>,
  filteredMassSetter: React.Dispatch<React.SetStateAction<RecordDKeys[]>>,
  filteredRefMass: React.MutableRefObject<RecordDKeys[]>,
  filtered: RecordDKeys[],
  maxVal: React.MutableRefObject<number>
) {
  if (parseInt(valFrom) > maxVal.current || parseInt(valTo) > maxVal.current) {
    setTimeout(() => {
      checkingIfDataCorrect(false);
    }, 3000);
    warningTextSetter("Значение(я) превышено(ы)!");
    checkingIfDataCorrect(true);
  } else if (valFrom === "" && valTo === "") {
    setTimeout(() => {
      checkingIfDataCorrect(false);
    }, 3000);
    warningTextSetter("Введите диапазон фильтрации!");
    checkingIfDataCorrect(true);
  } else {
    if (valFrom === "") {
      filteredMassSetter(
        (filteredRefMass.current = filtered.filter((e) => {
          if (typeof e.price === "number") {
            return parseInt(valTo) >= e.price;
          }
          return 0;
        }))
      );
    } else if (valTo === "") {
      filteredMassSetter(
        (filteredRefMass.current = filtered.filter((e) => {
          if (typeof e.price === "number") {
            return parseInt(valFrom) <= e.price;
          }
          return 0;
        }))
      );
    } else {
      filteredMassSetter(
        (filteredRefMass.current = filtered.filter((e) => {
          if (typeof e.price === "number") {
            return parseInt(valFrom) <= e.price && parseInt(valTo) >= e.price;
          }
          return 0;
        }))
      );
    }
  }
}

export { ValidationPriceRange, FilterByPriceRange };
