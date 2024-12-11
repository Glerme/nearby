import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

import { categoriesIcons } from "@/utils/categories-icons";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

interface CategoryProps extends PressableProps {
  iconId: string;
  isSelected?: boolean;
  name: string;
}

export const Category: React.FC<CategoryProps> = ({
  iconId,
  name,
  isSelected,
  ...props
}) => {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...props}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  );
};
