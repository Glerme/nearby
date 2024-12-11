import React from "react";
import { FlatList } from "react-native";

import { Category } from "./components/Category";

import { styles } from "./styles";

export type CategoriesDataProps = {
  id: string;
  name: string;
}[];

interface CategoriesProps {
  categories: CategoriesDataProps;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelectCategory(item.id)}
          isSelected={selectedCategory === item.id}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  );
};
