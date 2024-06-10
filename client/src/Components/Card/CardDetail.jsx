import { RxAvatar } from "react-icons/rx";
import classes from "./CardDetail.module.css";

const CardDetail = ({ username, description, questionid }) => {
  return (
    <div className={classes.card}>
      <div className={classes.avatarContainer}>
        <RxAvatar className={classes.avatar} />
        <p className={classes.username}>{username}</p>
      </div>
      <p className={classes.description}>{description}</p>
    </div>
  );
};

export default CardDetail;
