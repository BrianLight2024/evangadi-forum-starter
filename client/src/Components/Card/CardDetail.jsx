import { RxAvatar } from "react-icons/rx";
import classes from "./CardDetail.module.css";

// eslint-disable-next-line react/prop-types
const CardDetail = ({ username, answer }) => {
  return (
    <div className={classes.card}>
      <div className={classes.avatarContainer}>
        <RxAvatar className={classes.avatar} />
        <p className={classes.username}>{username}</p>
      </div>
      <p className={classes.answer}>{answer}</p>
    </div>
  );
};

export default CardDetail;
