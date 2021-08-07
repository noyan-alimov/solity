import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { Button } from '../components/Button'
import { InputWithLabel } from '../components/InputWithLabel'
import { Layout } from '../components/Layout'
import { supabase } from '../supabaseClient'

interface props {
  navigation: NavigationProp<any>
}

export const SignIn = ({ navigation }: props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigateToSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleSignIn = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email, password })
      setLoading(false)
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
      setLoading(false)
    }
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
            text='sign in'
            onPress={handleSignIn}
            type='primary'
            loading={loading}
          />
          <Text style={tailwind('mt-10 text-green-500 text-xl')}>don't have an account?</Text>
          <Button
            text='sign up'
            onPress={navigateToSignUp}
            type='outlined'
            marginTop={'4'}
          />
        </View>
    </Layout>
  )
}