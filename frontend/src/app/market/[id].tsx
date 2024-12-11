import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";

import { Redirect, router, useLocalSearchParams } from "expo-router";

import { api } from "@/services/api";

import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Coupon, Cover, Details, DetailsProps } from "@/components/Market";
import { CameraView, useCameraPermissions } from "expo-camera";

const MarketDetails = () => {
  const [market, setMarket] = useState<DetailsProps | null>(null);
  const [coupon, setCoupon] = useState<string | null>(null);

  const [_, requestPermission] = useCameraPermissions();
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  const params = useLocalSearchParams<{ id: string }>();

  const qrLock = useRef(false);

  const getMarket = async () => {
    try {
      const { data } = await api.get(`/markets/${params.id}`);

      setMarket(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao buscar dados", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert(
          "Câmera",
          "Você precisa permitir o acesso à câmera para continuar"
        );
      }

      qrLock.current = false;

      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao abrir câmera", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  };

  const getCoupon = async (id: string) => {
    try {
      setIsCouponLoading(true);

      const { data } = await api.patch(`/coupons/${id}`);

      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao buscar cupom", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleUseCoupon = (id: string) => {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Resgatar",
          onPress: () => getCoupon(id),
        },
      ]
    );
  };

  useEffect(() => {
    getMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!market) return <Redirect href="/home" />;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={isCouponLoading}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default MarketDetails;
