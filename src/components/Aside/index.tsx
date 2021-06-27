import React from "react"

import { Box, Image, Heading, Text, useColorModeValue } from "@chakra-ui/react"

import illustrationImg from "../../assets/images/illustration.svg"

export const Aside = () => {

  const colorMode = useColorModeValue("light", "dark")

  return (
    <Box
      bg="baianBlue"
      p="10"
    >
      <Image
        src={illustrationImg}
        alt="Ilustração simbolizando perguntas e respostas"
        mt="4"
      />
      <Heading
        mt="4"
        color={colorMode === "light" ? "white" : "gray.900"}
      >
        Crie salas de Q&amp;A ao-vivo
      </Heading>
      <Text
        mt="2"
        fontSize="larger"
        color={colorMode === "light" ? "white" : "gray.900"}
      >
        Tire dúvidas da sua audiência em tempo-real
      </Text>
    </Box>
  )
}