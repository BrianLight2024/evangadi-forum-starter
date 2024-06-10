import { RxAvatar } from "react-icons/rx";
import { MdArrowForwardIos } from "react-icons/md";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";

const Card = ({ username, title, questionid }) => {
  const navigate = useNavigate();

  const redirectToAnswer = (e) => {
    e.preventDefault();
    const q = 1;
    navigate(`/question/${q}`);
  };
  return (
    <div className={classes.card} onClick={redirectToAnswer}>
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
