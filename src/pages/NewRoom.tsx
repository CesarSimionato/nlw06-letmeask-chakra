import React, { FormEvent, useState } from "react"

import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react"

import { Link, useHistory } from 'react-router-dom'

import logoLightImg from "../assets/images/logoLight.svg"
import logoDarkImg from "../assets/images/logoDark.svg"

import { CustomButton } from "../components/CustomButton"
import { CustomInput } from "../components/CustomInput"
import { Aside } from "../components/Aside"
import { useAuth } from "../hooks/useAuth"
import { database } from "../services/firebase"

export const NewRoom = () => {

  const colorMode = useColorModeValue("light", "dark")

  const history = useHistory()

  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('')
  const [roomDescription, setRoomDescription] = useState('')

  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom.trim(),
      description: roomDescription.trim(),
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
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
            mb="8"
          />

          <form onSubmit={handleCreateRoom}>
            <CustomInput
              placeholder="Nome da sala"
              mb="4"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <CustomInput
              placeholder="Descrição da Sala (Opcional)"
              mb="6"
              value={roomDescription}
              onChange={event => setRoomDescription(event.target.value)}
            />
            <CustomButton type="submit">
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