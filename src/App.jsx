import { Box } from "@chakra-ui/react";
import "./App.css";
import Hero from "./components/features/Hero";
import Send from "./components/features/Send";

function App() {
  return (
    <Box px='16px'>
      <Hero />
      <Send />
    </Box>
  );
}

export default App;
