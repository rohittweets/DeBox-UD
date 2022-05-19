import React from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";

function Loading() {
  return (
    <>
      <Box className="blur-box">
        <Box
          position="fixed"
          w="100%"
          h="100%"
          top="40%"
          zIndex="999"
          my="auto"
        >
          <Box top="50%">
            <Stack spacing="1em" alignItems="center">
              <Box align="center">
                <Heading fontSize="3em" fontFamily="Philosopher">
                  DeBox
                </Heading>
                <Text fontFamily="Philosopher" textTransform="capitalize">
                  An user-friendly, decentralized Secured cloud storage
                </Text>
              </Box>
              <Box className="loading-bar"></Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Loading;
