import { Session } from '@supabase/supabase-js'
import React, { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { InputWithLabel } from '../components/InputWithLabel'
import { Layout } from '../components/Layout'
import { supabase } from '../supabaseClient'

interface props {
    session?: Session
}

export const Account = ({ session }: props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user!.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user!.id,
        username,
        website,
        avatar_url,
        updated_at: new Date()
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) throw error
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <Layout>
        <InputWithLabel
            label='email'
            value={session?.user?.email ? session.user.email : ''}
            disabled
            marginTop={'20'}
        />
        <InputWithLabel
            label='name'
            value={username}
            onChangeText={setUsername}
        />
        <InputWithLabel
            label='website'
            value={website}
            onChangeText={setWebsite}
        />
        <Button
            text='update'
            onPress={updateProfile}
            loading={loading}
            type='primary'
        />
        <Button
            text='sign out'
            onPress={() => supabase.auth.signOut()}
            type='outlined'
        />
    </Layout>
  )
}