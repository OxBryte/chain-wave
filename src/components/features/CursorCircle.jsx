import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CursorFollow = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Box
        bg="whiteAlpha.100"
        w="30px"
        h="30px"
        rounded="full"
        position="absolute"
        pointerEvents="none"
        transition="transform 0.2s ease"
        style={{
          left: cursorPosition.x - 20, // Adjust for circle size
          top: cursorPosition.y - 20, // Adjust for circle size
        }}
      />
    </>
  );
};

export default CursorFollow;
