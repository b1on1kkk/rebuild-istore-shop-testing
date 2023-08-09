export default function RecheckingColors(
  getParams: string | undefined,
  AvailablePhoneColors: string[]
) {
  if (getParams === "iPhone 14") {
    return AvailablePhoneColors.map((e: string) => {
      return e.toLowerCase().includes("s") ? e.slice(0, -10) : e;
    });
  }
  return AvailablePhoneColors;
}
