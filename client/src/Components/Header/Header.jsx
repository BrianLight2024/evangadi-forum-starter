import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const userId = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
  };

  return (
    <section className={classes.fixed}>
      <section className={classes.header__container}>
        {/* Logo */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
              alt="evangadi logo"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={classes.home_container}>
          <div>
            <p>Home</p>
          </div>
          <div>
            <p>How it works</p>
          </div>
          <Link to={"/auth"}>
            <div className={classes.cursor}>
              {userId ? (
                <span onClick={handleLogout}>Log Out</span>
              ) : (
                <span>Log In</span>
              )}
            </div>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Header;
