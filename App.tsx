import React from 'react'
import { Auth } from './src/components/Auth'
import 'react-native-url-polyfill/auto'
import { MainApp } from './src/components/MainApp'
import { UserContextProvider, useUser } from './src/context/UserContext'

export default function App() {
  return (
    <UserContextProvider>
      <MyApp />
    </UserContextProvider>
  )
}

const MyApp = () => {
  const { session } = useUser()

  if (!session) {
    return <Auth />
  }

  return <MainApp />
}