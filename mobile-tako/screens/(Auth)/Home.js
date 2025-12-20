import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <Text style={styles.judul}>Welcome to Tako App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  judul: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
