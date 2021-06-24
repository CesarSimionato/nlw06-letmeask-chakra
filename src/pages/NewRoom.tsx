import React from "react"

import { Flex, Image, Text } from "@chakra-ui/react"

import { Link } from 'react-router-dom'

import logoImg from "../assets/images/logo.svg"

import { CustomButton } from "../components/CustomButton"
import { CustomInput } from "../components/CustomInput"
import { Aside } from "../components/Aside"

export const NewRoom = () => {
  return (
    <Flex
      h="100vh"
      align="stretch"
    >
      <Aside />

      <Flex
        flex="1"
        align="center"
        justify="center"
      >
        <Flex
          width="100%"
          maxW="320px"
          direction="column"
          align="stretch"
          textAlign="center"
        >
          <Image
            src={logoImg}
            alt="Letmeask"
            alignSelf="center"
            mb="8"
          />

          <form>
            <CustomInput
              placeholder="Nome da sala"
              mb="4"
            />
            <CustomInput
              placeholder="Descrição da Sala (Opcional)"
              mb="6"
            />
            <CustomButton>
              Criar sala
            </CustomButton>
          </form>


          <Text mt="4" color="gray.600">Quer entrar em uma sala já existente?</Text>
          <Text
            color="baianBlue"
            textDecor="underline"
            _hover={{
              color: "baianBlueHover"
            }}
          >
            <Link to="/">Clique aqui</Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}