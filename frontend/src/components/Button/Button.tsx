import React from "react";
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

interface IconProps {
  icon: React.ComponentType<TablerIconProps>;
}

const Button = ({
  children,
  style,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ActivityIndicator color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  );
};

const Title: React.FC<TextProps> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const Icon: React.FC<IconProps> = ({ icon: Icon }: IconProps) => {
  return <Icon size={24} color={colors.gray[100]} />;
};

Button.Title = Title;
Button.Icon = Icon;

export { Button };
