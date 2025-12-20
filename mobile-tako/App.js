import { NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import RootNavigator from "./navigators/RootNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client/react";
import client from "./config/apollo";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
