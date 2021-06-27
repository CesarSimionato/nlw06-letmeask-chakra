import React from "react"

import { Flex, Image, Heading, Text } from "@chakra-ui/react"

import emptyQuestionsImg from "../../assets/images/emptyQuestions.svg"


export const EmptyQuestions: React.FC = ({ children }) => {
  return (
    <Flex
      mt="20"
      direction="column"
      align="center"
      justify="center"
    >
      <Image
        maxW="200px"
        src={emptyQuestionsImg}
        alt="nenhuma pergunta"
      />
      <Heading
        mt="6"
      >
        Nenhuma pergunta por aqui...
      </Heading>
      <Text
        mt="4"
      >
        {children}
      </Text>
    </Flex>
  )
}