import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { PlaceDataProps, Places } from "@/components/Places";
import { Categories, CategoriesDataProps } from "@/components/Categories";

import { api } from "@/services/api";

import { colors, fontFamily } from "@/styles/theme";
import { useRouter } from "expo-router";

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

const Home = () => {
  const [categories, setCategories] = useState<CategoriesDataProps>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [markets, setMarkets] = useState<PlaceDataProps[]>([]);

  const router = useRouter();

  const getCategories = async () => {
    try {
      const { data } = await api.get("/categories");

      setCategories(data);
      setSelectedCategory(data[0]?.id);
    } catch (error) {
      Alert.alert("Categorias", "Erro ao buscar categorias.");
    }
  };

  const getMarkets = async () => {
    try {
      if (!selectedCategory) return;

      const { data } = await api.get(`/markets/category/${selectedCategory}`);

      setMarkets(data);
    } catch (error) {
      Alert.alert("Locais", "Erro ao buscar locais.");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync({});

        console.log(location);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // getCurrentLocation();
    getCategories();
  }, []);

  useEffect(() => {
    getMarkets();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: "#cecece" }}>
      <Categories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
};

export default Home;
