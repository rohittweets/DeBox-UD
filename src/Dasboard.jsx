import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from "moment";
import {
  Box,
  Stack,
  Heading,
  Tag,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  Avatar,
  Image,
  Link,
} from "@chakra-ui/react";
import Upload from "./components/upload";
import PdfBg from "./img/pdf.png";
import IMG from "./img/image-file.png";
import Docs from "./img/docs.png";
import svgAvatarGenerator from "./controllers/avatar";
import Loading from "./Loading";

import DeCloudContract from "./artifacts/contracts/DeCloud.sol/DeCloud.json";

export default function Home({ user, handleLogout, currentAccount }) {
  const deContract = DeCloudContract;
  const [avatar, setAvatar] = useState(undefined);
  const [userData, setUserData] = useState([]);
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(true);

  // const contractAddress = "0x8C0ae1387c4cD0f6007317eeC4F7CA70949549A8"; //ropsten
  const contractAddress = "0xEA2D4C60E3Bf97621fdCf809b44d14a91C032ece"; //mumbai

  useEffect(() => {
    const today = new Date();

    const hour = today.getHours();
    console.log(hour);

    if (hour < 12) {
      setWish("Morning");
    } else if (hour < 17) {
      setWish("Afternoon");
    } else {
      setWish("Evening");
    }

    window.ethereum &&
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  }, []);

  async function fetchUserData() {
    if (window.ethereum == "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      deContract.abi,
      provider
    );

    let overrides = {
      from: currentAccount,
    };

    const filesData = await contract.fetchUserFiles(overrides);
    setUserData(filesData);
    console.log("Data: ", filesData);

    // console.log(filesData[0].uploadTime.toString());
    // setBalance(balance.toString());
    // setShowBalance(true);
    return filesData;
  }

  useEffect(async () => {
    // if (currentAccount == undefined) {
    //   const [account] = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });
    //   return account;
    // }

    console.log(currentAccount);
    console.log(user, "ddd");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      contractAddress,
      deContract.abi,
      provider
    );

    let overrides = {
      from: user ? user.wallet_address : currentAccount,
    };

    const filesData = await contract.fetchUserFiles(overrides);
    setUserData(filesData);

    let svg = svgAvatarGenerator(currentAccount, { dataUri: true });
    setAvatar(svg);

    console.log(userData, ": userdata");
    // let data = await fetchUserData();
    // console.log(data, ": data");
  }, []);

  function handleSrc(file) {
    switch (file.fileType) {
      case "txt":
        return Docs;
        break;
      case "png":
        return IMG;
        break;
      case "jpg":
        return IMG;
        break;
      case "jpeg":
        return IMG;
        break;
      case "pdf":
        return PdfBg;
        break;
      default:
        return Docs;
        break;
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Box h="100vh">
        <Box className="dashboard-blur">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            py="1rem"
            mx="3rem"
          >
            <Link href="/">
              <Text
                className="heading"
                cursor="pointer"
                fontSize="1.5rem"
                fontFamily="Pacifico"
              >
                DeCloud
              </Text>
            </Link>

            <Button
              ml="30px"
              fontFamily="Lato"
              colorScheme="purple"
              className="btn"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Flex>
          <Flex
            justifyContent="center"
            py="1.5rem"
            pb="1.5rem"
            pt="0.5rem"
            alignItems="center"
          >
            <Avatar
              borderStyle="solid"
              borderColor="#8444e6"
              borderWidth="4px"
              pt="2px"
              p="10px"
              size="xl"
              bg="transparent"
              src={avatar}
            />
            <Box p="1rem">
              {" "}
              <Heading color="black" fontFamily="Philosopher">
                Good {wish},
              </Heading>
              <Tag fontFamily="Raleway">
                {user
                  ? user.sub
                  : currentAccount
                  ? `${currentAccount.substr(0, 6)}...${currentAccount.substr(
                      -4
                    )}`
                  : null}
              </Tag>
            </Box>
          </Flex>
        </Box>

        {userData.length ? (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mx="4rem"
            p="1rem"
          >
            <Text
              mb="0"
              align="center"
              fontFamily="Raleway"
              color="#111"
              fontSize="2rem"
            >
              Your Files
            </Text>
          </Flex>
        ) : (
          <Flex
            alignItems="center"
            mt="5%"
            justifyContent="center"
            mx="4rem"
            p="1rem"
          >
            <Text
              mb="0"
              align="center"
              fontFamily="Raleway"
              color="#111"
              fontSize="2rem"
            >
              Start Uploading Your Files !
            </Text>
          </Flex>
        )}

        <Upload deContract={deContract} contractAddress={contractAddress} />

        <Box>
          <Flex px="1rem">
            {userData.map((file, index) => {
              return (
                <Box key={index}>
                  <Popover isLazy placement="top">
                    <PopoverTrigger>
                      <Box
                        cursor="pointer"
                        m="1rem"
                        p="1rem"
                        className="file-blur"
                        align="right"
                      >
                        <Stack align="center">
                          <Image src={handleSrc(file)}></Image>
                          <Text
                            fontFamily="Raleway"
                            color="white"
                            mb="0px"
                            fontSize="1.2rem"
                            textAlign="center"
                          >
                            {file && file.fileName}
                          </Text>
                          <Text
                            mt="-10px"
                            mb="0"
                            lineHeight="5px"
                            color="whiteAlpha.700"
                            fontFamily="Raleway"
                          >
                            {moment
                              .unix(file.uploadTime.toString())
                              .format("D/M/Y")}
                          </Text>
                        </Stack>
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent className="blur">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader fontFamily="Raleway">
                        Details
                      </PopoverHeader>
                      <PopoverBody fontFamily="Lato">
                        <Text>
                          Size:{" "}
                          <Text
                            align="justify"
                            color="black.800"
                            fontFamily="Raleway"
                          >
                            {file && file.fileSize.toString() / 1000} KB
                          </Text>
                        </Text>
                        <br />
                        <Text>
                          Description:{" "}
                          <Text
                            align="justify"
                            color="black.800"
                            fontFamily="Raleway"
                          >
                            {file && file.fileDescription}
                          </Text>
                        </Text>
                        <br />
                        <Text>
                          Web3.Storage Encrypted Hash:{" "}
                          <Text
                            align="justify"
                            color="black.800"
                            fontFamily="Raleway"
                          >
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://${file.fileHash}.ipfs.dweb.link`}
                            >
                              {file && file.fileHash}
                            </a>
                          </Text>
                        </Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
