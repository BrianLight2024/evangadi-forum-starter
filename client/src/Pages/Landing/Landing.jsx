import { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import classes from "./Landing.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { axiosInstance } from "../../Api/axios";

function Landing() {
  const [{ user }] = useContext(DataContext);
  const [cards, setCards] = useState([]);

  // list questions
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        await axiosInstance({
          method: "GET",
          url: `/questions/list`,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }).then((response) => {
          setCards(response.data.questions);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswers();
  }, []);

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
      <section className={classes.cursor}>
        {cards.length === 0 ? (
          <div className={classes.emptyState}>
            <p>
              No Questions available at the moment. Please login and check back
              later.
            </p>
          </div>
        ) : (
          cards.map((card, index) => (
            <Card
              key={index}
              avatar={card.avatar}
              username={card.username}
              title={card.title}
            />
          ))
        )}
      </section>
    </LayOut>
  );
}

export default Landing;
