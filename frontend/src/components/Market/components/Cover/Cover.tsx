import { ImageBackground, View } from "react-native";
import { router } from "expo-router";

import { IconArrowLeft } from "@tabler/icons-react-native";

import { Button } from "@/components/Button";

import { styles } from "./styles";

interface CoverProps {
  uri: string;
}

export const Cover: React.FC<CoverProps> = ({ uri }) => {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
};
