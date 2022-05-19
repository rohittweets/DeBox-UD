import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import herobg from "./img/hero-bg.json";
import metamask from "./img/metamask-fox.svg";
import domain from "./img/usd.svg";

function Main({ handleLogin, metamaskLogin }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Flex h="100vh" justifyContent="space-around" alignItems="center">
          <Stack spacing="8rem">
            <Heading className="heading" fontFamily="Pacifico" mt="-30%">
              DeCloud
            </Heading>

            <Box>
              <Heading
                color="black"
                fontFamily="Philosopher"
                className="hero-heading"
              >
                Take your files <br /> everywhere, <span>safe</span>
              </Heading>
              <Text
                mt="1.5rem"
                fontFamily="Philosopher"
                fontSize="2rem"
                lineHeight="40px"
              >
                An user-friendly, decentralized <br />
                Secured cloud storage
              </Text>
              <Button mt="2rem" onClick={onOpen} className="btn">
                Get Started
              </Button>
            </Box>
          </Stack>
          <Box className="hero-blur" h="90vh" w="450px" rounded="lg">
            <Player
              src={herobg}
              className="player"
              background="transparent"
              loading="lazy"
              speed="1"
              loop
              muted
              autoplay
            />
          </Box>
        </Flex>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Box py="1em" h="min-content">
                <Flex justifyContent="center">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    px="3.5em"
                    py="1em"
                    _hover={{ backgroundColor: "whitesmoke" }}
                    rounded="20px"
                    cursor="pointer"
                    onClick={() => {
                      metamaskLogin();
                      onClose();
                    }}
                  >
                    <Image src={metamask} width={95} />
                    <Text fontFamily="Lato" textTransform="uppercase" mt="2em">
                      Metamask
                    </Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDir="column"
                    px="3em"
                    py="1em"
                    _hover={{ backgroundColor: "whitesmoke" }}
                    rounded="20px"
                    cursor="pointer"
                    onClick={() => {
                      handleLogin();
                      onClose();
                    }}
                  >
                    <Image src={domain} width={100} />
                    <Text
                      fontFamily="Lato"
                      textAlign="center"
                      textTransform="uppercase"
                      mt="2em"
                    >
                      unstoppable domain
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default Main;
