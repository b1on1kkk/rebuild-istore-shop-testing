import { MutableRefObject } from "react";

interface InputProps {
  index: number;
  checkBox: "color" | "memory";
  checkedBoxesType: MutableRefObject<number[]>;
  onChangeFunc: (
    index: number,
    state: boolean,
    type: string,
    checkedBoxesType: MutableRefObject<number[]>
  ) => void;
}

const Input: React.FC<InputProps> = ({
  index,
  checkBox,
  checkedBoxesType,
  onChangeFunc,
}) => {
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFunc(index, e.currentTarget.checked, checkBox, checkedBoxesType);
  };

  return (
    <input type="checkbox" onChange={handler} id="filter-checkbox"></input>
  );
};

export default Input;
