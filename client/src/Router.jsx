import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
// import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      {/* <Route
        path="/payments"
        element={
          <   
            msg={"You must log in to pay."}
            redirect={"/payments"}
          >
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </>
        }
      />  */}
    </Routes>
  );
}

export default Routing;
