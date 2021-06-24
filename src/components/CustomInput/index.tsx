import React from "react"

import { Input, InputProps } from "@chakra-ui/react"

export const CustomInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      focusBorderColor="baianBlue"
      size="lg"
      color="gray.600"
      {...props}
    />
  )
}