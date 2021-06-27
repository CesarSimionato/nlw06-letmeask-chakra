import React, { FormEvent, useState } from "react"

import { Flex, Image, Text, Button, Divider, useColorModeValue } from "@chakra-ui/react"

import { FcGoogle } from "react-icons/fc"
import { MdExitToApp } from "react-icons/md"

import logoLightImg from "../assets/images/logoLight.svg"
import logoDarkImg from "../assets/images/logoDark.svg"

import { CustomButton } from "../components/CustomButton"
import { CustomInput } from "../components/CustomInput"
import { Aside } from "../components/Aside"
import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"
import { useHistory } from "react-router-dom"

export const Home = () => {

  const colorMode = useColorModeValue("light", "dark")

  const history = useHistory()

  const { user, signInWithGoogle } = useAuth()

  const [roomCode, setRoomCode] = useState('')

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if (roomRef.val().closedAt) {
      alert('Room alread closed.')
      return
    }

    if (user?.id === roomRef.val().authorId) {
      history.push(`/admin/rooms/${roomCode}`)
    } else {
      history.push(`/rooms/${roomCode}`)
    }
  }

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
            src={colorMode === "light" ? logoLightImg : logoDarkImg}
            alt="Letmeask"
            alignSelf="center"
          />
          <Button
            leftIcon={<FcGoogle size={26} />}
            variant="outline"
            mt="8"
            size="lg"
            color={colorMode === "light" ? "gray.600" : ""}
            _focus={{
              boxShadow: "none"
            }}
            onClick={handleCreateRoom}
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

          <form onSubmit={handleJoinRoom}>
            <CustomInput
              color={colorMode === "light" ? "gray.600" : ""}
              placeholder="Digite o código da sala"
              mb="6"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <CustomButton type="submit" leftIcon={<MdExitToApp size={25} color={colorMode === "light" ? "white": ""} />}>
              Entrar na sala
            </CustomButton>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}