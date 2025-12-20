import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export default function RootNavigator() {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <AppStack /> : <AuthStack />;
}
