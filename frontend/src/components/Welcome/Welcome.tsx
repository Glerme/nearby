import { Image, Text, View } from "react-native";

import { styles } from "./styles";

export const Welcome = () => {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Boas vindas!</Text>

      <Text style={styles.subtitle}>
        Tenha cupons de vantagem para usar em {"\n"}
        seus estabelecimentos favoritos.
      </Text>
    </View>
  );
};
