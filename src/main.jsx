import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.jsx";
import "@fontsource-variable/inter";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      clientId="648dd0dd39c83ec04b42837410d06c75"
    >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ThirdwebProvider>
  </StrictMode>
);
