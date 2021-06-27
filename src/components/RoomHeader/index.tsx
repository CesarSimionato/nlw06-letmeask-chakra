import React from "react"

import { Box, Text, Flex, Heading, Tag, useColorModeValue } from "@chakra-ui/react"

type RoomHeaderProps = {
  title: string
  description?: string
  questionsQty: number
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({ title, description, questionsQty, children }) => {

  const colorMode = useColorModeValue("light", "dark")

  return (
    <Box>
      {
        description &&
        <Text>
          {description}
        </Text>
      }
      <Flex
        h="50px"
        align="center"
        justify="space-between"
      >
        <Flex
          align="center"
        >
          <Heading fontSize="x-large" letterSpacing="wide">
            {title}
          </Heading>
          <Tag
            size="md"
            ml="4"
            color={colorMode === "light" ? "white" : "gray.900"}
            bg="baianBlue"
            visibility={questionsQty > 0 ? "visible" : "hidden"}
          >
            {questionsQty > 1 ? `${questionsQty} perguntas` : "1 pergunta"}
          </Tag>
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}