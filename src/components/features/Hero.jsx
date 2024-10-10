import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { HiArrowSmDown } from "react-icons/hi";

export default function Hero() {
  return (
    <>
      <VStack
        w="full"
        minH="70vh"
        align="center"
        justify="center"
        // backgroundImage="url('/public/pattern.svg')"
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
      >
        <VStack gap="16px">
          <Heading textAlign="center" fontSize={[32, 48]}>
            Welcome to Multi Sender
          </Heading>
          <Text maxW="520px" textAlign="center" color="whiteAlpha.600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            adipisci quidem incidunt fuga dolorem cumque asperiores ipsum animi
            ut, provident perspiciatis totam.
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
          >
            Get Started <HiArrowSmDown size={23} />{" "}
          </Button>
        </VStack>
      </VStack>
    </>
  );
}
