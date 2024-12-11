import { Text, View } from "react-native";

import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

import { Info } from "../Info";

import { styles } from "./styles";

export interface DetailsDataProps {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
  cover: string;
}

type DetailsProps = {
  data: DetailsDataProps;
};

export const Details: React.FC<DetailsProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>

        {data.rules.map((rule) => (
          <Text key={rule.id} style={styles.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
};
