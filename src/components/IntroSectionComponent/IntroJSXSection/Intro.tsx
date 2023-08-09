import { v4 as uuidv4 } from "uuid";
import { MDBSpinner } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import "./IntroSectionStyles.css";

import { IntroProps } from "../interfaces/IntroSectionInterfaces";

const Intro: React.FC<IntroProps> = ({
  loadingScreen,
  phoneData,
}): JSX.Element => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="category-list">
              <>
                {loadingScreen && (
                  <MDBSpinner className="m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                )}
              </>

              <>
                {!loadingScreen && (
                  <>
                    {phoneData?.record?.map((e) => {
                      return (
                        <div
                          className="category-list-item-wrapper"
                          key={uuidv4()}
                        >
                          <Link to={e.name}>
                            <div className="category-data-wrapper">
                              <div className="phone-icon">
                                <img src={e.picture} alt="goodPicture" />
                              </div>
                              <div className="phone-description">
                                <p>{e.name}</p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

// export default function Intro(): JSX.Element {
//   return (

//   );
// }
