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
import {
  ConnectWallet,
  useAddress,
  useBalance,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useState } from "react"; // Import useState
import { CgCloseO } from "react-icons/cg";
import { contractABI, contractAddress } from "../constants/constant";

export default function Send() {
  const [selectTab, setSelectTab] = useState(0);
  const [addresses, setAddresses] = useState([""]);
  const [amount, setAmount] = useState("");
  const [importedAddresses, setImportedAddresses] = useState([]);

  const address = useAddress();
  const { data: balance } = useBalance();
  //   console.log(balance);

  const { contract } = useContract(contractAddress, contractABI);
  const {
    mutateAsync: sendETH,
    isLoading,
    error,
  } = useContractWrite(contract, "sendETH");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").filter((row) => row.trim() !== "");
      const parsedAddresses = rows.map((row) => {
        const [address, amount] = row.split(",");
        return { address: address.trim(), amount: amount.trim() };
      });
      setImportedAddresses(parsedAddresses);
      console.log("Imported addresses:", parsedAddresses);
    };
    reader.readAsText(file);
  };

  const handleImportedAddressChange = (index, field, value) => {
    const updatedAddresses = [...importedAddresses];
    updatedAddresses[index][field] = value;
    setImportedAddresses(updatedAddresses);
  };

  const removeImportedAddressField = (index) => {
    const updatedAddresses = importedAddresses.filter((_, i) => i !== index);
    setImportedAddresses(updatedAddresses);
  };

  const handleSendTokens = async () => {
    if (!contract && !address) return;

    const _recipients = addresses.filter((address) => address !== "");
    const _amounts = Array(_recipients.length).fill(ethers.utils.parseEther(amount.toString()));

    try {
      await sendETH({ args: [_recipients, _amounts] });
      console.log("Tokens sent successfully", _recipients, _amounts);
    } catch (error) {
      console.log("Error sending tokens:", error);
    }
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
          <Text>
            {balance
              ? parseFloat(ethers.utils.formatEther(balance.value)).toFixed(4)
              : "0.00"}{" "}
            {balance?.symbol}
          </Text>
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
                <Text>List of addresses</Text>
                {importedAddresses.length > 0 &&
                  importedAddresses.map((imported, index) => (
                    <Flex key={index} align="center" gap="8px">
                      {" "}
                      <Input
                        type="text"
                        placeholder={`Enter address ${index + 1}`}
                        value={imported.address}
                        onChange={(e) =>
                          handleImportedAddressChange(
                            index,
                            "address",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="text"
                        w="100px"
                        placeholder={`Enter amount ${index + 1}`}
                        value={imported.amount}
                        onChange={(e) =>
                          handleImportedAddressChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                      />
                      <Button onClick={() => removeImportedAddressField(index)}>
                        <CgCloseO />
                      </Button>{" "}
                    </Flex>
                  ))}
                <Button
                  as="label"
                  htmlFor="fileInput"
                  bg="brand.200"
                  color="brand.100"
                >
                  Import CSV
                  <Input
                    id="fileInput"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    hidden
                  />
                </Button>
                {importedAddresses.length > 0 && (
                  <Button
                    as="label"
                    htmlFor="fileInput"
                    bg="brand.200"
                    color="brand.100"
                  >
                    Send funds
                    <Input
                      id="fileInput"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                )}
              </VStack>
            </VStack>
          )}

          {tabs[selectTab] === "Manual Send" && (
            <VStack align="left" gap="16px" w="full">
              <VStack align="left" w="full">
                <Text>Amount to send</Text>
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
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
              {address ? (
                <Button
                  w="full"
                  bg="brand.200"
                  color="brand.100"
                  onClick={() => handleSendTokens()}
                >
                  Send Funds
                </Button>
              ) : (
                <ConnectWallet switchToActiveChain />
              )}
            </VStack>
          )}
        </VStack>
      </VStack>
    </>
  );
}
