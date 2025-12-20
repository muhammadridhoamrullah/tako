import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/(Non-Auth)/LoginScreen";
import RegisterScreen from "../screens/(Non-Auth)/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
