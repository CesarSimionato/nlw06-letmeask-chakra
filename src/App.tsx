import * as React from "react"

import { ChakraProvider } from "@chakra-ui/react"

import { BrowserRouter, Route, Switch } from "react-router-dom"

import { AuthContextProvider } from "./contexts/AuthContext"

import { theme } from "./styles/theme"

import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"
import { Room } from "./pages/Room"
import { AdminRoom } from "./pages/AdminRoom"

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
)
