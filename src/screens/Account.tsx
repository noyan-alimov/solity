import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { Button } from '../components/Button'
import { InputWithLabel } from '../components/InputWithLabel'
import { Layout } from '../components/Layout'
import { useUser } from '../context/UserContext'
import { supabase } from '../supabaseClient'

export const Account = () => {
  const { session } = useUser()

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
        updated_at: new Date(),
        email: session?.user?.email
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

  const email = useMemo(() => {
    if (!session) return ''
    if (!session.user) return ''

    return session.user.email
  }, [session])
  
  return (
    <Layout>
        <InputWithLabel
            label='email'
            value={email ? email : ''}
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