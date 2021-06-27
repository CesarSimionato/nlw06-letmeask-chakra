import React, { useRef, useState } from "react"

import { ReactNode } from "react"

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex } from "@chakra-ui/react"
import { CustomOutilineButton } from "./components/CustomOutilineButton"

type ConfirmationAlertProps = {
  icon: ReactNode
  title: string
  message: string
  confirmFunction: () => Promise<void>
}

export const ConfirmationAlert: React.FC<ConfirmationAlertProps> = ({ icon, title, message, confirmFunction }) => {

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)

  const handleConfirm = () => {
    confirmFunction()
  }

  return (
    <>
      <CustomOutilineButton onClick={() => setIsOpen(true)}>
        Encerrar sala
      </CustomOutilineButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            pt="10"
            pb="10"
            pl="6"
            pr="6"
          >

            <Flex
              align="center"
              justify="center"
            >
              {
                icon
              }
            </Flex>

            <AlertDialogHeader
              p="0"
              mt="4"
              letterSpacing="wide"
              fontSize="lg"
              fontWeight="semibold"
              textAlign="center"
            >
              {title}
            </AlertDialogHeader>

            <AlertDialogBody
              mt="2"
              p="0"
            >
              {message}
            </AlertDialogBody>

            <AlertDialogFooter
              mt="10"
              p="0"
              justifyContent="space-evenly"
            >
              <Button onClick={onClose}
                letterSpacing="wide"
                fontWeight="medium"
                _focus={{
                  boxShadow: "none"
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirm}
                letterSpacing="wide"
                fontWeight="medium"
                colorScheme="red"
                _focus={{
                  boxShadow: "none"
                }}
              >
                Sim, encerrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}