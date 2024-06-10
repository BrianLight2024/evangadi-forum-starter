import { RxAvatar } from "react-icons/rx";
import { MdArrowForwardIos } from "react-icons/md";
import classes from "./Card.module.css";

const Card = ({ username, title }) => {
  return (
    <div className={classes.card}>
      <div className={classes.avatarContainer}>
        <RxAvatar className={classes.avatar} />
        <p className={classes.username}>{username}</p>
      </div>
      <p className={classes.title}>{title}</p>
      <MdArrowForwardIos className={classes.arrow} />
    </div>
  );
};

export default Card;
