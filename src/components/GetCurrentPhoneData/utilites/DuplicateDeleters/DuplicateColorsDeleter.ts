export default function DuplicateColorsDeleter(filteredArray: string[]) {
  const buffArr: string[] = [];
  filteredArray.forEach((e: string) => {
    if (!buffArr.includes(e)) {
      buffArr.push(e);
    }
  });

  return buffArr;
}
