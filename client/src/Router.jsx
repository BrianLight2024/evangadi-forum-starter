import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Question from "./Pages/Question/Question";
import QuestionResponse from "./Pages/Question/QuestionResponse";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/ask"
        element={
          <ProtectedRoute
            msg={"You must log in to view questions."}
            redirect={"/"}
          >
            <Question />
          </ProtectedRoute>
        }
      />
      <Route element={<QuestionResponse />} />
      <Route
        path="/question/:questionid"
        element={
          <ProtectedRoute
            msg={"You must log in to view questions."}
            redirect={"/"}
          >
            <QuestionResponse />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
