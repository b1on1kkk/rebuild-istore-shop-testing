import {
  PhoneColors,
  PhoneMemory,
  RecordDKeys,
} from "../../interfaces/interfaces";

function instanceOfPhoneColors(
  obj: PhoneColors[] | PhoneMemory[]
): obj is PhoneColors[] {
  if (obj[0].type === "color") {
    return true;
  } else {
    return false;
  }
}

export default function ProcessOfSortingData(
  arrOfCheckedBoxes: React.MutableRefObject<number[]>,
  typeOfFilteredMass: RecordDKeys[],
  filterSetter: React.Dispatch<React.SetStateAction<RecordDKeys[]>>,
  typeOfData: PhoneColors[] | PhoneMemory[],
  intermediateFilteredMass?: RecordDKeys[]
): RecordDKeys[] | [] {
  console.log(typeOfFilteredMass, intermediateFilteredMass);

  let buff: RecordDKeys[] = [];
  for (let i = 0; i < arrOfCheckedBoxes.current.length; i++) {
    for (let j = 0; j < typeOfFilteredMass.length; j++) {
      if (instanceOfPhoneColors(typeOfData)) {
        if (
          typeOfFilteredMass[j].name
            .toLowerCase()
            .includes(
              typeOfData[arrOfCheckedBoxes.current[i]].colorName.toLowerCase()
            )
        ) {
          buff.push(typeOfFilteredMass[j]);
        }
      } else {
        if (
          typeOfFilteredMass[j].name
            .toLowerCase()
            .includes(
              typeOfData[
                arrOfCheckedBoxes.current[i]
              ].amountOfMemory.toLowerCase()
            )
        ) {
          buff.push(typeOfFilteredMass[j]);
        }
      }
    }
  }
  if (intermediateFilteredMass) {
    filterSetter(buff);
    return buff;
  }
  filterSetter(buff);
  return [];
}
