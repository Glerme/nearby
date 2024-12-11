import { useRef } from "react";

import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Place } from "./components/Place";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export type PlaceDataProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
  latitude: number;
  longitude: number;
};

interface PlacesProps {
  data: PlaceDataProps[];
}

export const Places: React.FC<PlacesProps> = ({ data }) => {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const router = useRouter();

  const snapPoints = {
    min: 278,
    max: dimensions.height - 278,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.title}>Explore locais perto de você</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
};
