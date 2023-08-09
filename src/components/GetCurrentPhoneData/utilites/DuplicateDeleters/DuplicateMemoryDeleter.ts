import { PhoneMemory } from "../../interfaces/interfaces";

export default function DuplicateMemoryDeliter(filteredArray: PhoneMemory[]) {
  const memoryAmounts = filteredArray.map((e) => e.amountOfMemory);
  const filtered = filteredArray.filter(
    ({ amountOfMemory }, index) =>
      !memoryAmounts.includes(amountOfMemory, index + 1)
  );
  return filtered;
}
