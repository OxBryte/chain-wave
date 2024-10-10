import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react"; // Import useState
import { CgCloseO } from "react-icons/cg";

export default function Send() {
  const [selectTab, setSelectTab] = useState(0); // Initialize state for tab selection
  const [addresses, setAddresses] = useState([""]); // Initialize state for addresses

  const tabs = ["Manual Send", "Import from CSV"]; // Tabs array

  const addAddressField = () => {
    setAddresses([...addresses, ""]); // Function to add a new address field
  };

  const removeAddressField = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index); // Remove address at the specified index
    setAddresses(newAddresses);
  };

  const handleAddressChange = (index, value) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value; // Update the specific address
    setAddresses(newAddresses);
  };

  const handleImportedAddresses = (addresses) => {
    // Assuming addresses is a CSV string
    const addressList = addresses
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    // Process the address list (e.g., store it in state, log it, etc.)
    console.log(addressList); // Replace this with your desired logic
  };

  return (
    <>
      <VStack minH="80vh" justify="center" align={"center"} gap="16px">
        <Text>Send to tokens multiple addresses</Text>
        <Flex
          maxW="md"
          w="full"
          justify="space-between"
          align="center"
          gap="24px"
          px="16px"
        >
          <Text>Balance</Text>
          <Text>3,000,000 Eth</Text>
        </Flex>
        <VStack
          minH="360px"
          bg="whiteAlpha.50"
          rounded="16px"
          maxW="md"
          w="full"
          gap="24px"
          p="24px"
        >
          <Flex align="center" gap="12px" w="full">
            {tabs.map((tab, index) => (
              <Button
                key={index}
                w="full"
                bg={selectTab === index ? "brand.200" : "whiteAlpha.400"}
                color="brand.100"
                onClick={() => setSelectTab(index)}
              >
                {tab}
              </Button>
            ))}
          </Flex>
          {tabs[selectTab] === "Import from CSV" && (
            <VStack align="left" gap="16px" w="full">
              <VStack align="left" w="full">
                <Text>Amount to send</Text>
                <Input type="number" placeholder="Enter Amount" />
              </VStack>
              <VStack align="left" w="full">
                <Text>List of addresses</Text>
                <Input
                  type="file"
                  placeholder="Upload CSV"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const text = e.target.result;
                      const rows = text
                        .split("\n")
                        .map((row) => row.split(","));
                      const addresses = rows.map((row) => ({
                        amount: row[0],
                        address: row[1],
                      }));
                      // Assuming there's a function to handle the extracted addresses
                      handleImportedAddresses(addresses);
                    };
                    reader.readAsText(file);
                  }}
                />
                <Button>Import from CSV</Button>
              </VStack>
            </VStack>
          )}

          {tabs[selectTab] === "Manual Send" && (
            <VStack align="left" gap="16px" w="full">
              <VStack align="left" w="full">
                <Text>Amount to send</Text>
                <Input type="number" placeholder="Enter Amount" />
              </VStack>
              <VStack align="left" w="full">
                <Text>List of addresses</Text>
                {addresses.map((address, index) => (
                  <Flex key={index} align="center" gap="8px">
                    {" "}
                    <Input
                      type="text"
                      placeholder={`Enter address ${index + 1}`}
                      value={address}
                      onChange={(e) =>
                        handleAddressChange(index, e.target.value)
                      } // Handle input change
                    />
                    <Button onClick={() => removeAddressField(index)}>
                      <CgCloseO />
                    </Button>{" "}
                  </Flex>
                ))}
                <Button w="full" onClick={addAddressField}>
                  Add wallet
                </Button>{" "}
              </VStack>
              <FormControl display="flex" gap="12px" alignItems="center">
                <FormLabel m="0">Auto send</FormLabel>
                <Switch size="md" colorScheme="brand" />
              </FormControl>
              <Button w="full" bg="brand.200" color="brand.100">
                Send Funds
              </Button>
              {/* <Button>Connect Wallet</Button> */}
            </VStack>
          )}
        </VStack>
      </VStack>
    </>
  );
}
