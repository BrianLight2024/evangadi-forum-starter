// import { useContext, useEffect } from "react";
import Routing from "./Router";
// import { DataContext } from "./Components/DataProvider/DataProvider";
// import { Type } from "./Utility/action.type";

const App = () => {
  // const [, dispatch] = useContext(DataContext);
  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       dispatch({
  //         type: Type.SET_USER,
  //         user: authUser,
  //       });
  //     } else {
  //       dispatch({
  //         type: Type.SET_USER,
  //         user: null,
  //       });
  //     }
  //   });
  // }, []);
  return <Routing />;
};

export default App;
