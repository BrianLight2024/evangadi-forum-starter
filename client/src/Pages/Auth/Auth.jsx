import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { useState, useContext } from "react"; 
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const navigate = useNavigate();
  const navStateData = useLocation();

  const [, dispatch] = useContext(DataContext);
  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      // await signInWithEmailAndPassword(auth, email, password)
      //   .then((userInfo) => {
      //     dispatch({
      //       type: Type.SET_USER,
      //       user: userInfo.user,
      //     });
      //     setLoading({ ...loading, signIn: false });
      //     navigate(navStateData?.state?.redirect || "/");
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading({ ...loading, signIn: false });
      //   });
    } else {
      setLoading({ ...loading, signUp: true });
      // await createUserWithEmailAndPassword(auth, email, password)
      //   .then((userInfo) => {
      //     // Put the User in the state as soon as a new account is created
      //     dispatch({
      //       type: Type.SET_USER,
      //       user: userInfo.user,
      //     });
      //     setLoading({ ...loading, signUp: false });
      //     navigate(navStateData?.state?.redirect || "/");
      //   })
      //   .catch((error) => {
      //     setError(error.message);
      //     setLoading({ ...loading, signUp: false });
      //   });
    }
  };
  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: 5,
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email"> Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && <small className={classes.login__error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
