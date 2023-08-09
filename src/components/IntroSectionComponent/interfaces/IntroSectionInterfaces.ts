interface RecordDKeys {
  name: string;
  picture: string;
}
interface DataObject {
  record: RecordDKeys[];
  metadata: object;
}
interface IntroProps {
  loadingScreen: boolean;
  phoneData: DataObject | null;
}

export type { RecordDKeys, DataObject, IntroProps };
