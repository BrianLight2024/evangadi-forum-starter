import { useState, useContext } from "react";
import { Type } from "../../Utility/action.type";
import { Link } from "react-router-dom";
import classes from "./SignUp.module.css";
import { axiosInstance } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";

const Auth = () => {
  const navigate = useNavigate();

  const [, dispatch] = useContext(DataContext);

  const [displayLogin, setDisplayLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    // check if it is a login or a register call happening
    try {
      if (displayLogin === true) {
        // Contact with the backend functionality
        await axiosInstance({
          method: "POST",
          url: `/users/login`,
          data: {
            email,
            password,
          },
        }).then((response) => {
          const userObject = {
            userid: response.data.userid,
            username: response.data.username,
            firstname: response.data.firstname,
          };

          dispatch({
            type: Type.SET_USER,
            user: userObject,
          });
        });
        navigate("/");
      } else {
        // call the register function
        // Contact with the backend functionality
        await axiosInstance({
          method: "POST",
          url: `/users/register`,
          data: {
            email,
            password,
            username,
            firstname,
            lastname,
          },
        }).then((response) => {
          const userObject = {
            userid: response.data.userid,
            username: response.data.username,
            firstname: response.data.firstname,
          };

          dispatch({
            type: Type.SET_USER,
            user: userObject,
          });
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.authContainer}>
      <div className={classes.authInnerContainer}>
        <div className={classes.loginBox}>
          <h2 className={classes.loginTitle}>
            {displayLogin ? "Login to your account" : "Create a new account"}
          </h2>
          {displayLogin ? (
            <p className={classes.createAccount}>
              Don’t have an account?{" "}
              <span
                onClick={() => setDisplayLogin(false)}
                className={classes.toggleForm}
              >
                Create a new account
              </span>
            </p>
          ) : (
            <p className={classes.createAccount}>
              Already have an account?{" "}
              <span
                onClick={() => setDisplayLogin(true)}
                className={classes.toggleForm}
              >
                Login
              </span>
            </p>
          )}
          <form onSubmit={handleSubmit} className={classes.loginForm}>
            {!displayLogin && (
              <div className={classes.nameFields}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={classes.inputField}
                />

                <input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className={classes.inputField}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className={classes.inputField}
                />
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.inputField}
            />
            {!displayLogin ? (
              <p className={classes.agreeTerms}>
                I agree to the <u> privacy policy </u> and{" "}
                <u> terms of service </u>.
              </p>
            ) : (
              <Link to="/forgot-password" className={classes.forgotPassword}>
                Forgot password?
              </Link>
            )}
            <button type="submit" className={classes.loginButton}>
              {displayLogin ? "Login" : "Agree and Join"}
            </button>

            <span
              className={classes.account}
              onClick={() => setDisplayLogin(true)}
            >
              {displayLogin ? "" : " Already have an account?"}
            </span>
          </form>
        </div>
        <div className={classes.aboutSection}>
          <h2 className={classes.aboutTitle}>About</h2>
          <h1 className={classes.networkTitle}>Evangadi Networks</h1>
          <p className={classes.aboutText}>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p className={classes.aboutText}>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button
            className={classes.createAccountButton}
            onClick={() => setDisplayLogin(false)}
          >
            {"CREATE A NEW ACCOUNT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
