import React from "react"

import { Header } from "../components/Header"

import { ClipboardButton } from "../components/ClipboardButton"
import { ConfirmationAlert } from "../components/ConfirmationAlert"
import { EmptyQuestions } from "../components/EmptyQuestions"
import { RoomHeader } from "../components/RoomHeader"
import { QuestionCard } from "../components/QuestionCard"

import { Box, Flex, HStack, Icon, Spinner, useColorModeValue } from "@chakra-ui/react"

import { MdCancel } from "react-icons/md"
import { BiCheckCircle, BiMessage, BiTrash } from "react-icons/bi"
import { useRoom } from "../hooks/useRoom"
import { useHistory, useParams } from "react-router-dom"
import { database } from "../services/firebase"

interface RoomParams {
  id: string
}

export const AdminRoom = () => {

  const colorMode = useColorModeValue("light", "dark")

  const history = useHistory()

  const params = useParams<RoomParams>()
  const roomId = params.id

  const { questions, title, description, loadingQuestions } = useRoom(roomId)

  const handleCheckQuestionAsAnswered = async (questionId: string, isAnswered: boolean) => {
    if (isAnswered) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: false
      })
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true
      })
    }
  }

  const handleHighlightQuestion = async (questionId: string, isHighlighted: boolean) => {
    if (isHighlighted) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: false
      })
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted: true
      })
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })

    history.push('/')
  }

  return (
    <Flex
      h="100vh"
      direction="column"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
    >
      <Header>
        <ClipboardButton roomId={roomId} />
        <ConfirmationAlert
          icon={<MdCancel size={50} color="#E53E3E" />}
          title="Encerrar sala"
          message="Tem certeza que você deseja encerrar esta sala?"
          confirmFunction={handleEndRoom}
        />
      </Header>
      {
        loadingQuestions
          ?
          <Flex flex="1" align="center" justify="center">
            <Spinner size="xl" color="baianBlue" />
          </Flex>
          :
          <Box
            flex="1"
            height="100%"
            p="6"
            overflow="auto"
          >
            <Box
              margin="0 auto"
              maxW="800px"
            >

              <RoomHeader
                title={title}
                description={description}
                questionsQty={questions.length}
              />

              {
                questions &&
                  questions.length > 0
                  ?
                  <Box
                    mt="3"
                    flex="1"
                    overflow="auto"
                  >
                    {
                      questions.map(question => {
                        return (
                          <QuestionCard
                            key={question.id}
                            hasAnswered={question.isAnswered}
                            hasHighlight={question.isHighlighted}
                            message={question.content}
                            authorName={question.author.name}
                            photoUrl={question.author.avatar}
                            likeQty={question.likeCount > 0 ? question.likeCount : undefined}
                          >
                            <HStack spacing="3">
                              {
                                !question.isHighlighted &&
                                <Icon
                                  color={question.isAnswered ? "green.400" : ""}
                                  as={BiCheckCircle}
                                  w={7}
                                  h={7}
                                  cursor="pointer"
                                  transition="0.2s"
                                  _hover={{ color: "green.400" }}
                                  onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                                />
                              }
                              {
                                !question.isAnswered &&
                                <Icon
                                  color={question.isHighlighted ? "baianBlue" : ""}
                                  as={BiMessage}
                                  w={7}
                                  h={7}
                                  cursor="pointer"
                                  transition="0.2s"
                                  _hover={{ color: "baianBlue" }}
                                  onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}
                                />
                              }
                              <Icon
                                as={BiTrash}
                                w={7}
                                h={7}
                                cursor="pointer"
                                transition="0.2s"
                                _hover={{ color: "red.500" }}
                                onClick={() => handleDeleteQuestion(question.id)}
                              />
                            </HStack>
                          </QuestionCard>
                        )
                      })
                    }
                  </Box>
                  :
                  <EmptyQuestions>
                    Envie o código desta sala para seus amigos e comece a responder perguntas!
                  </EmptyQuestions>
              }
            </Box>
          </Box>
      }
    </Flex>
  )
}



