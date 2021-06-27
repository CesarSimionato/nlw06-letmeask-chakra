import React from "react"

import { Button, ButtonProps } from "@chakra-ui/react"

export const CustomOutilineButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="outline"
      color="baianBlueHover"
      borderColor="baianBlue"
      size="md"
      letterSpacing="wider"
      fontWeight="normal"
      _focus={{
        boxShadow: "none"
      }}
      {...props}
    >
      {children}
    </Button>
  )
}