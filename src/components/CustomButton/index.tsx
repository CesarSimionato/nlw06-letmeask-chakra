import React from "react"

import { Button, ButtonProps } from "@chakra-ui/react"

export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      bg="baianBlue"
      color="white"
      size="lg"
      letterSpacing="wider"
      isFullWidth
      _hover={{
        bg:"baianBlueHover"
      }}
      _focus={{
        boxShadow: "none"
      }}
      {...props}
    >
      {children}
    </Button>
  )
}