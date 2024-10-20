import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: "brand.100",
      // bgSize: "cover",
      // bgRepeat: 'no-repeat',
      color: mode("blackAlpha.800", "whiteAlpha.800")(props),
    },
  }),
};

const colors = {
  brand: {
    100: "#1A1C28",
    200: "rgba(199,242,132)",
    300: "rgba(199,242,132,0.05)",
    400: "rgba(199,242,132,0.3)",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

const fonts = {
  heading: `'Inter Variable', sans-serif`,
  body: `'Inter Variable', sans-serif`,
};

const components = {
  Button: {},
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors, fonts, components });
export default theme;
