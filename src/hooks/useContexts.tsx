//Context setup
import { useContext } from "react";

//Context body
import { AuthData } from "../contexts/AuthDataContext";

//Context use
const useAuthDataContext = () => useContext(AuthData);

export {useAuthDataContext};