import LayOut from "../../Components/LayOut/LayOut";
import CardDetail from "../../Components/Card/CardDetail";
import classes from "./QuestionResponse.module.css";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const QuestionResponse = ({ title, description, tag }) => {
  const cards = [
    {
      avatar: "https://via.placeholder.com/50",
      username: "test-user",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "almaz123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.",
    },
  ];

  return (
    <LayOut>
      <div className={classes.responseHeader}>
        <h1> Question </h1>
        <div className={classes.responseHeader__title}>
          <IoArrowForwardCircleSharp size={25} color={"#0b5ed7"} />
          <h2> What is title ? </h2>
        </div>

        <h4 className={classes.responseHeader__description}>
          {" "}
          How does it work{" "}
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
              description={card.description}
            />
          ))}
        </section>
        {/* Answer section */}
        <textarea
          placeholder="Your answer..."
          className={classes.textArea}
        ></textarea>
        <button className={classes.postButton}>Post Answer</button>
      </div>
    </LayOut>
  );
};

export default QuestionResponse;
