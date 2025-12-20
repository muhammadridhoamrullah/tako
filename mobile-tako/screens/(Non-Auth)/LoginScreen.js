import { Link } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@react-navigation/elements";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.main}>
      <Text style={styles.judul}>This is Home Screen</Text>

      <Link screen={"Register"}>Go to Register</Link>
      <Button screen={"Register"}>Go to Regis cuy</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  judul: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
