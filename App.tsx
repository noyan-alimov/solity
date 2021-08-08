import React from 'react'
import { Auth } from './src/components/Auth'
import 'react-native-url-polyfill/auto'
import { MainApp } from './src/components/MainApp'
import { UserContextProvider, useUser } from './src/context/UserContext'

export const UserContextConsumer = () => {
  const { session } = useUser()

  if (!session) {
    return <Auth />
  }
  
  return <MainApp />
}

export default function App() {

  return (
    <UserContextProvider>
      <UserContextConsumer />
    </UserContextProvider>
  )
}