import "../GetPhoneDataStyles.css";

export const ModalFilterWindow = (props: any): JSX.Element => {
  return (
    <div
      className="modal-filter-window"
      style={props.openCloseStatus ? { left: 0 } : {}}
    >
      <>
        {props.openCloseStatus && (
          <div className="modal-content-wrapper">
            <button
              className="close-modal-filter-button"
              onClick={() => {
                props.openCloseSetter(false);
                document.body.style.overflow = "auto";
              }}
            >
              <svg
                _ngcontent-snj-c219=""
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ng-tns-c219-19"
              >
                <g
                  _ngcontent-snj-c219=""
                  clipPath="url(#clip0)"
                  className="ng-tns-c219-19"
                >
                  <path
                    _ngcontent-snj-c219=""
                    d="M11.7688 10.0096L19.6335 2.14481C20.1222 1.65659 20.1222 0.864449 19.6335 0.376237C19.1449 -0.112391 18.3536 -0.112391 17.865 0.376237L10.0002 8.24099L2.13504 0.376237C1.64641 -0.112391 0.8551 -0.112391 0.366471 0.376237C-0.122157 0.864449 -0.122157 1.65659 0.366471 2.14481L8.23164 10.0096L0.366471 17.8743C-0.122157 18.3625 -0.122157 19.1547 0.366471 19.6429C0.610786 19.8868 0.930979 20.0089 1.25076 20.0089C1.57053 20.0089 1.89073 19.8868 2.13504 19.6425L10.0002 11.7777L17.865 19.6425C18.1093 19.8868 18.4295 20.0089 18.7492 20.0089C19.069 20.0089 19.3892 19.8868 19.6335 19.6425C20.1222 19.1542 20.1222 18.3621 19.6335 17.8739L11.7688 10.0096Z"
                    fill="black"
                    className="ng-tns-c219-19"
                  ></path>
                </g>
                <defs _ngcontent-snj-c219="" className="ng-tns-c219-19">
                  <clipPath
                    _ngcontent-snj-c219=""
                    id="clip0"
                    className="ng-tns-c219-19"
                  >
                    <rect
                      _ngcontent-snj-c219=""
                      width="20"
                      height="20"
                      fill="white"
                      className="ng-tns-c219-19"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
        <div className="modal-mobile-wrapper">{props.children}</div>
      </>
    </div>
  );
};

// export default ModalFilterWindow;
