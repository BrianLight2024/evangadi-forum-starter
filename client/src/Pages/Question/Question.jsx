import { useState } from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import classes from "./Question.module.css";
import LayOut from "../../Components/LayOut/LayOut";

function Question() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDetail, setQuestionDetail] = useState("");

  const steps = [
    {
      value: "Summarize your problems in a one-line-title.",
    },
    {
      value: "Describe your problem in more detail.",
    },
    {
      value: "Describe what you tried and what you expected to happen.",
    },
    {
      value: "Review your question and post it here.",
    },
  ];
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Question Title:", questionTitle);
    console.log("Question Detail:", questionDetail);
    // You can add logic here to submit the form data to a backend or perform other actions
  };

  return (
    <LayOut>
      <form onSubmit={handleSubmit} className={classes.formContainer}>
        <h1>Steps To Write A Good Question</h1>
        <>
          {steps.map((step, index) => (
            <div className={classes.summary} key={index}>
              <IoArrowForwardCircleSharp size={25} color={"#0b5ed7"} />
              <h4> {step.value}</h4>
            </div>
          ))}
        </>

        <h1 className={classes.postTitle}>Post your Question </h1>
        <input
          type="text"
          id="questionTitle"
          name="questionTitle"
          placeholder="Question title"
          className={classes.title}
          value={questionTitle}
          onChange={(event) => setQuestionTitle(event.target.value)}
          required
        />

        <textarea
          id="questionDetail"
          name="questionDetail"
          placeholder="Question detail"
          className={classes.description}
          value={questionDetail}
          onChange={(event) => setQuestionDetail(event.target.value)}
          required
        />

        <button type="submit">Post Question</button>
      </form>
    </LayOut>
  );
}

export default Question;
