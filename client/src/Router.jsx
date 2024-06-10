import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Question from "./Pages/Question/Question";
import QuestionResponse from "./Pages/Question/QuestionResponse";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/ask" element={<Question />} />
      <Route path="/question/:questionId" element={<QuestionResponse />} />
    </Routes>
  );
}

export default Routing;
