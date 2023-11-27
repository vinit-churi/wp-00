import { useContext } from "react";
import { MyContext } from "./ContextProvider";
const useMyContext = () => {
  return useContext(MyContext);
};

export default useMyContext;
