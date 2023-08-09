interface RecordDKeys {
  id: number;
  name: string;
  picture: string;
  price: string | number;
}

interface PhoneMemory {
  type: "memory";
  amountOfMemory: string;
}

interface PhoneColors {
  type: "color";
  phoneHexColor: string;
  colorName: string;
}

export type { RecordDKeys, PhoneColors, PhoneMemory };
