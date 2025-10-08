import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Signup() {
  return (
    <SafeAreaView style={s.root}>
      <Text style={s.title}>Sign Up</Text>
      <Pressable style={s.btn} onPress={() => router.back()}>
        <Text style={s.btnText}>Volver</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  btn: { backgroundColor: "#B0F200", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24 },
  btnText: { color: "#00140B", fontWeight: "700" },
});
