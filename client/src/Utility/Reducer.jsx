import { MdDescription } from "react-icons/md";
import { Type } from "./action.type";

export const initialState = {
  user: null,
  question: {
    title: "",
    description: "",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.SET_USER: {
      return { ...state, user: action.user };
    }

    case Type.SET_QUESTION: {
      console.log("state", state);
      // const title = state.title;

      return { ...state, user: action.user };
    }

    default:
      return state;
  }
};
