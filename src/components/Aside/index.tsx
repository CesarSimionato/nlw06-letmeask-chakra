import React from "react"

import { Box, Image, Heading, Text } from "@chakra-ui/react"

import illustrationImg from "../../assets/images/illustration.svg"

export const Aside = () => {
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
        color="white"
      >
        Crie salas de Q&amp;A ao-vivo
      </Heading>
      <Text
        mt="2"
        fontSize="larger"
        color="white"
      >
        Tire dúvidas da sua audiência em tempo-real
      </Text>
    </Box>
  )
}