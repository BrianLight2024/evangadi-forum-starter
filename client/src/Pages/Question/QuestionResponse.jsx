import { useEffect, useState } from "react";
import { axiosInstance } from "../../Api/axios";
import LayOut from "../../Components/LayOut/LayOut";
import CardDetail from "../../Components/Card/CardDetail";
import classes from "./QuestionResponse.module.css";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";

const QuestionResponse = () => {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const { questionid } = useParams();
  const [cards, setCards] = useState([]);
  const [answer, setPostAnswer] = useState("");

  // list all answers to the question
  const fetchQuestionAnswers = async () => {
    try {
      await axiosInstance({
        method: "GET",
        url: `/questions/get`,
        params: {
          questionid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setCards(response.data.questionAnswers);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Call on load
  useEffect(() => {
    fetchQuestionAnswers();
  });

  // Post answer
  const postAnswer = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: `/answers/post`,
        data: {
          userid: userId,
          questionid,
          answer,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        setPostAnswer("");
        fetchQuestionAnswers();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LayOut>
      <div className={classes.responseHeader}>
        <h1> Question </h1>
        <div className={classes.responseHeader__title}>
          <IoArrowForwardCircleSharp size={25} color={"#0b5ed7"} />
          <h2> {cards[0]?.question_title} </h2>
        </div>

        <h4 className={classes.responseHeader__description}>
          {cards[0]?.question_description}
        </h4>

        <hr />

        <h1>Answer from the Community </h1>
        <hr />
      </div>

      <div className={classes.detail}>
        {/* cards section */}
        <section className={classes.answerList}>
          {cards.map((card, index) => (
            <CardDetail
              key={index}
              avatar={card.avatar}
              username={card.username}
              answer={card.answer}
            />
          ))}
        </section>
        {/* Answer section */}
        <textarea
          placeholder="Your answer..."
          className={classes.textArea}
          value={answer}
          onChange={(event) => setPostAnswer(event.target.value)}
          required
        ></textarea>
        <button className={classes.postButton} onClick={postAnswer}>
          Post Answer
        </button>
      </div>
    </LayOut>
  );
};

export default QuestionResponse;
