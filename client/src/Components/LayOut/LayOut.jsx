/* eslint-disable react/prop-types */
import Header from "../Header/Header";

function LayOut({ children }) {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
}

export default LayOut;
