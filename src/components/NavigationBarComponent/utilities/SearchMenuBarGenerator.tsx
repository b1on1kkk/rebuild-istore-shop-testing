import { MDBSpinner } from "mdb-react-ui-kit";

interface RecordDKeys {
  id: number;
  name: string;
  picture: string;
  price: number;
}

export default function GenerateSearchMenuBar(
  filteredItems: RecordDKeys[],
  sizeShowTo: number,
  sizeShowFrom: number
): JSX.Element[] | JSX.Element {
  if (filteredItems) {
    if (filteredItems.length > 5 && sizeShowTo <= filteredItems.length) {
      return filteredItems.slice(sizeShowFrom, sizeShowTo).map((e) => {
        return (
          <div className="good-wrapper" key={e.id}>
            <div className="good">
              <div className="picture-wrapper">
                <img src={e.picture} alt="phone-logo" width={70}></img>
              </div>
              <div className="main-inf">
                <div className="phone-model">{e.name}</div>
                <div className="phone-price">{e.price}</div>
              </div>
            </div>
          </div>
        );
      });
    }
    return <></>;
  } else {
    return (
      <MDBSpinner className="m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
}
