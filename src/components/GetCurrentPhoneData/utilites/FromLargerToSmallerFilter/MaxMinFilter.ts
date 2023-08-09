import { RecordDKeys } from "../../interfaces/interfaces";

// change symbols interprepation and some optimisations
export default function FilterFromLargerToSmaller(
  fromLargerToSmaller: boolean,
  setFiltered: React.Dispatch<React.SetStateAction<RecordDKeys[]>>,
  filtered: RecordDKeys[],
  setFromLargerToSmaller: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (fromLargerToSmaller) {
    setFiltered(
      filtered.sort((a: RecordDKeys, b: RecordDKeys) => {
        if (typeof a.price === "number" && typeof b.price === "number") {
          return a.price - b.price;
        }
        return 0;
      })
    );
    setFromLargerToSmaller(false);
  } else {
    setFiltered(
      filtered.sort((a: RecordDKeys, b: RecordDKeys) => {
        if (typeof a.price === "number" && typeof b.price === "number") {
          return b.price - a.price;
        }
        return 0;
      })
    );
    setFromLargerToSmaller(true);
  }
}
