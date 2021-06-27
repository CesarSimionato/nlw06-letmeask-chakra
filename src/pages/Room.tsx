import React, { FormEvent } from "react"

import { Header } from "../components/Header"

import { ClipboardButton } from "../components/ClipboardButton"
import { EmptyQuestions } from "../components/EmptyQuestions"
import { CustomButton } from "../components/CustomButton"

import { Avatar, Box, Button, Flex, Link, Text, Textarea, Icon, Spinner, useColorModeValue } from "@chakra-ui/react"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { BiLike } from "react-icons/bi"

import { RoomHeader } from "../components/RoomHeader"
import { useState } from "react"
import { QuestionCard } from "../components/QuestionCard"
import { useAuth } from "../hooks/useAuth"
import { useParams } from "react-router-dom"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

interface RoomParams {
  id: string
}

export const Room = () => {

  const colorMode = useColorModeValue("light", "dark")

  const [showFormQuestion, setShowFormQuestion] = useState(false)

  const { user, signInWithGoogle } = useAuth()

  const params = useParams<RoomParams>()
  const roomId = params.id

  const { questions, title, description, loadingQuestions } = useRoom(roomId)

  const [newQuestion, setNewQuestion] = useState('')

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion.trim(),
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  const handleLikeQuestion = async (questionId: string, likeId: string | undefined) => {
    if (user) {
      if (likeId) {
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
      } else {
        await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
          authorId: user?.id,
        })
      }
    } else {
      await signInWithGoogle()
    }
  }

  const handleSignIn = async () => {
    signInWithGoogle()
  }

  return (
    <Flex
      h="100vh"
      direction="column"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
    >
      <Header>
        <ClipboardButton roomId={roomId} />
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
              >
                <Button
                  rightIcon={
                    showFormQuestion
                      ?
                      <MdKeyboardArrowUp style={{ marginTop: "2px" }} size={30} />
                      :
                      <MdKeyboardArrowDown style={{ marginTop: "2px" }} size={30} />
                  }
                  onClick={() => setShowFormQuestion(!showFormQuestion)}
                  variant="outline"
                  _focus={{
                    boxShadow: "none"
                  }}
                >
                  {showFormQuestion ? "Ocultar caixa de texto" : "Fazer uma pergunta"}
                </Button>
              </RoomHeader>

              {
                showFormQuestion &&
                <Box
                  mt="2"
                >
                  <form onSubmit={handleSendQuestion}>
                    <Textarea
                      focusBorderColor="baianBlue"
                      placeholder="Digite sua pergunta aqui"
                      bg={colorMode === "light" ? "white" : "gray.900"}
                      value={newQuestion}
                      onChange={event => setNewQuestion(event.target.value)}
                    />
                    <Flex
                      mt="3"
                      align="center"
                      justify="space-between"
                    >
                      {
                        user
                          ?
                          <Flex
                            align="center"
                          >
                            <Avatar
                              name={user?.name}
                              src={user?.avatar}
                              bg="baianBlue"
                              color="gray.900"
                              size="md"
                            />
                            <Text
                              ml="3"
                              fontSize="lg"
                            >
                              {user?.name}
                            </Text>
                          </Flex>
                          :
                          <Text>
                            Para enviar uma pergunta,{" "}
                            <Link onClick={handleSignIn} color="baianBlueHover">
                              faça seu login
                            </Link>
                          </Text>
                      }
                      <CustomButton
                        size="md"
                        isFullWidth={false}
                        type="submit"
                        disabled={!user}
                      >
                        Enviar pergunta
                      </CustomButton>
                    </Flex>
                  </form>
                </Box>
              }

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
                          >
                            <Flex
                              align="center"
                            >
                              <Text
                                mt="1"
                                mr="1"
                                fontWeight="medium"
                                fontSize="lg"
                              >
                                {question.likeCount > 0 && `${question.likeCount}`}
                              </Text>
                              <Icon
                                color={question.likeId && "baianBlue"}
                                as={BiLike}
                                w={27}
                                h={27}
                                _hover={{ color: question.likeId ? "baianBlueHover" : "baianBlueHover" }}
                                cursor="pointer"
                                transition="0.2s"
                                onClick={() => handleLikeQuestion(question.id, question.likeId)}
                              />
                            </Flex>
                          </QuestionCard>
                        )
                      })
                    }
                  </Box>
                  :
                  <EmptyQuestions>
                    {`${user ? "Seja" : "Faça o seu login e seja"} a primeira pessoa a fazer uma pergunta!`}
                  </EmptyQuestions>
              }
            </Box>
          </Box>
      }
    </Flex>
  )
}