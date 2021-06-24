import React from "react"

import { Flex, Image, Text, Button, Divider } from "@chakra-ui/react"

import { FcGoogle } from "react-icons/fc"
import { MdExitToApp } from "react-icons/md"

import logoImg from "../assets/images/logo.svg"

import { CustomButton } from "../components/CustomButton"
import { CustomInput } from "../components/CustomInput"
import { Aside } from "../components/Aside"

export const Home = () => {
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
          />
          <Button
            leftIcon={<FcGoogle size={26} />}
            variant="outline"
            mt="8"
            size="lg"
            color="gray.600"
            // p="6"
            _focus={{
              boxShadow: "none"
            }}
          >
            Crie sua sala com o Google
          </Button>
          <Flex
            align="center"
            justify="space-between"
            mt="6"
            mb="6"
          >
            <Divider w="50px" opacity="1" />
            <Text color="gray.400">
              ou entre em uma sala
            </Text>
            <Divider w="50px" opacity="1" />
          </Flex>

          <form>
            <CustomInput
              placeholder="Digite o código da sala"
              mb="6"
            />
            <CustomButton leftIcon={<MdExitToApp size={25} color="white" />}>
              Entrar na sala
            </CustomButton>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}