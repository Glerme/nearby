import { View } from "react-native";
import { IconPlus } from "@tabler/icons-react-native";

import { router } from "expo-router";

import { Steps } from "@/components/Steps";
import { Button } from "@/components/Button";
import { Welcome } from "@/components/Welcome";

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 40,
        gap: 40,
      }}
    >
      <Welcome />
      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        <Button.Icon icon={IconPlus} />
        <Button.Title>Click me</Button.Title>
      </Button>
    </View>
  );
};

export default App;
