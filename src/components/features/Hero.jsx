import { Box, Button, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { HiArrowSmDown } from "react-icons/hi";

export default function Hero() {
  return (
    <>
      <VStack
        w="full"
        minH="70vh"
        align="center"
        justify="center"
      >
        <VStack gap="16px">
          <Box w='240px'>
            <Image src="/ChainWave.png" alt="logo" />
          </Box>
          <Heading textAlign="center" fontSize={[32, 48]}>
            Welcome to Chain Wave
          </Heading>
          <Text maxW="520px" textAlign="center" color="whiteAlpha.600">
          Streamline Your Token Distribution
          </Text>
          <Button
            px="24px"
            bg="brand.300"
            borderColor="brand.200"
            borderWidth={0.4}
            _hover={{ bg: "brand.400" }}
            size="lg"
            rounded="12px"
            gap="12px"
            align="center"
            color="brand.200"
            onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
          >
            Get Started <HiArrowSmDown size={23} />
          </Button>
        </VStack>
      </VStack>
    </>
  );
}
