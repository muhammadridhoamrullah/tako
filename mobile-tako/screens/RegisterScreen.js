import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.main}>
      <Text style={styles.judul}>Ini Register Screen</Text>
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
