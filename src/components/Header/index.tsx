import React from "react"

import { Flex, Box, Image, HStack, useColorModeValue } from "@chakra-ui/react"

import logoLightImg from '../../assets/images/logoLight.svg'
import logoDarkImg from '../../assets/images/logoDark.svg'

import { ColorSwitcher } from "../ColorSwitcher"

export const Header: React.FC = ({ children }) => {

  const colorMode = useColorModeValue("light", "dark")

  return (
    <Box
      p="4"
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Flex
        m="0 auto"
        maxW="1120px"
        align="center"
        justify="space-between"
      >
        <Image
          maxH="45px"
          src={colorMode === "light" ? logoLightImg : logoDarkImg}
          alt="letmeask"
        />
        <HStack spacing="4">
          {
            children
          }
          <ColorSwitcher />
        </HStack>
      </Flex>
    </Box>
  )
}