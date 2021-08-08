import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { Button } from '../components/Button'
import { InputWithLabel } from '../components/InputWithLabel'
import { Layout } from '../components/Layout'
import { signUp } from '../fetchers/signUp'

interface props {
  navigation: NavigationProp<any>
}

export const SignUp = ({ navigation }: props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignUp = () => {
    signUp(email, password)
  }

  return (
    <Layout>
        <Text style={tailwind('text-center mt-20 text-4xl text-green-700')}>solity</Text>
        <InputWithLabel
          label='email'
          value={email}
          onChangeText={setEmail}
        />
        <InputWithLabel
          label='password'
          value={password}
          onChangeText={setPassword}
        />
        <View style={tailwind('items-center')}>
          <Button
            text='sign up'
            onPress={handleSignUp}
            type='primary'
          />
        </View>
    </Layout>
  )
}