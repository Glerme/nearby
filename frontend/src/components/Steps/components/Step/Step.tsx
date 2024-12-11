import React from "react";
import { Text, View } from "react-native";

import { IconProps } from "@tabler/icons-react-native";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

interface StepProps {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export const Step: React.FC<StepProps> = ({
  description,
  title,
  icon: Icon,
}) => {
  return (
    <View style={styles.container}>
      {Icon && <Icon size={32} color={colors.red.base} />}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};
