import React, { useEffect, useState } from 'react'
import { supabase } from './src/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { Account } from './src/screens/Account'
import { Auth } from './src/components/Auth'
import 'react-native-url-polyfill/auto'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    const authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      authSubscription.data?.unsubscribe()
    }
  }, [session])

  if (!session) {
    return <Auth />
  }

  return <Account key={session.user?.id} session={session} />
}