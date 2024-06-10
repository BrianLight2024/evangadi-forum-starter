import { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Landing() {
  const [{ user }] = useContext(DataContext);

  const cards = [
    {
      avatar: "https://via.placeholder.com/50",
      username: "test-user",
      title: "what is bootstrap?",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "almaz123",
      title: "how to center div?",
    },
    {
      avatar: "https://via.placeholder.com/50",
      username: "ibro123",
      title: "what is JWT?",
    },
  ];

  return (
    <LayOut>
      {/* Header section */}
      <section className={classes.header}>
        <Link to={"/ask"}>
          <button className={classes.askButton}>Ask Question</button>
        </Link>
        <div className={classes.welcome}>
          Welcome: <span className={classes.username}>{user?.firstname}</span>
        </div>
      </section>

      {/* cards section */}
      <section>
        {cards.map((card, index) => (
          <Card
            key={index}
            avatar={card.avatar}
            username={card.username}
            title={card.title}
          />
        ))}
      </section>
    </LayOut>
  );
}

export default Landing;
