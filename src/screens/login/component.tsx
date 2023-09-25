import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import SignInComponent from "./Components/signIn";
import { IProps } from "./propState";
import "./styles.scss";
import { ReactComponent as Logo } from "../../assets/img/logo/logo.svg";

function LoginComponent(props: IProps) {
  const [page, setPage] = useState("signIn");
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo.access_token) {
      props.history.push("");
    }
  }, [userInfo, props.history]);

  return (
    <div className="login">
      <div
        className={`container ${page === "signIn" ? "" : "right-panel-active"}`}
      >
        {/* <SignUpComponent /> */}
        <SignInComponent />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setPage("signIn")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <Logo  style={{width : '300px', height: 'auto'}}/>
              {/* <button className="ghost" onClick={() => setPage("signUp")}>
                Sign Up
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
