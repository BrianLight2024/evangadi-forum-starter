import { useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdArrowForwardIos } from "react-icons/md";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";

// eslint-disable-next-line react/prop-types
const Card = ({ username, title, description, questionid }) => {
  const navigate = useNavigate();
  const [, dispatch] = useContext(DataContext);
  console.log("title", title, description, questionid);
  const redirectToAnswer = (e) => {
    e.preventDefault();
    const questionObject = {
      title: title,
      description: description,
    };

    dispatch({
      type: Type.SET_QUESTION,
      user: questionObject,
    });
    navigate(`/question/${questionid}`);
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
