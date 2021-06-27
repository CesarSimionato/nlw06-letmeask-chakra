import React from "react"

import { Button, ButtonGroup, IconButton, useColorModeValue } from "@chakra-ui/react"

import { useClipboard } from "@chakra-ui/react"

import { MdDone, MdContentCopy } from "react-icons/md"

type ClipboardProps = {
  roomId: string
}

export const ClipboardButton: React.FC<ClipboardProps> = ({ roomId }) => {

  const roomLink = `http://localhost:3000/rooms/${roomId}`
  const { hasCopied, onCopy } = useClipboard(roomLink)

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomId)
  }

  return (
    <ButtonGroup
      size="md"
      isAttached
      variant="outline"
      borderLeft="none"
    >
      <IconButton
        borderRight="none"
        bg={hasCopied ? "green.400" : "baianBlue"}
        color={useColorModeValue("white", "gray.900")}
        borderLeftRadius="md"
        aria-label="Copiar link da sala"
        onClick={onCopy}
        _hover={{
          bg: hasCopied ? "green.500" : "baianBlueHover"
        }}
        _focus={{
          boxShadow: "none"
        }}
        icon={hasCopied ? <MdDone size={25} /> : <MdContentCopy size={20} />}
      />
      <Button
        onClick={handleCopyRoomCode}
        mr="-px"
        _focus={{
          boxShadow: "none"
        }}
      >{`Sala: ${roomId}`}</Button>
    </ButtonGroup>
  )
}