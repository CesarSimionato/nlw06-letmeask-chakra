import React from "react"

import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"

type QuestionCardProps = {
  message: string
  photoUrl?: string
  authorName: string
  hasAnswered?: boolean
  hasHighlight?: boolean
  likeQty?: number
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ message, photoUrl, authorName, hasAnswered, hasHighlight, children, likeQty }) => {

  const colorMode = useColorModeValue("light", "dark")

  return (
    <Box
      bg={hasAnswered ? colorMode === "light" ? "green.100" : "" : hasHighlight ? colorMode === "light" ? "blue.100" : "" : colorMode === "light" ? "white" : "transparent"}
      border={hasAnswered ? "2px" : hasHighlight ? "2px" : colorMode === "light" ? "0px" : "1px"}
      borderColor={hasAnswered ? "green.300" : hasHighlight ? "baianBlue" : colorMode === "light" ? "transparent" : "inherit"}
      borderRadius="md"
      p="4"
      mb="3"
      boxShadow="sm"
    >
      {
        likeQty &&
        <Flex
          align="center"
          justify="space-between"
          mb="2"
        >
          <Flex>
            <Text
              mt="1"
              mr="1"
              fontWeight="medium"
              fontSize="lg"
            >
              Data e Hora da Mensagem
            </Text>
          </Flex>
          <Flex
            align="center"
          >
            <Text
              mt="1"
              mr="1"
              fontWeight="medium"
              fontSize="lg"
            >{likeQty > 1 ? `${likeQty} likes` : "1 like"}</Text>
          </Flex>
        </Flex>
      }
      <Text>
        {message}
      </Text>
      <Flex
        mt="2"
        align="center"
        justify="space-between"
      >
        <Flex
          align="center"
        >
          <Avatar
            name={authorName}
            src={photoUrl}
            bg="baianBlue"
            color="gray.900"
            size="md"
          />
          <Text
            ml="3"
            fontSize="lg"
          >
            {authorName}
          </Text>
        </Flex>
        {
          children
        }
      </Flex>
    </Box>
  )
}