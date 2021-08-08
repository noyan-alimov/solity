import { NavigationProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { Chat } from '../components/Chat'
import { Layout } from '../components/Layout'
import { useUser } from '../context/UserContext'
import { Profile } from '../models/Profile'
import { supabase } from '../supabaseClient'

interface props {
    navigation: NavigationProp<any>
}

export const Chats = ({ navigation }: props) => {
    const { user } = useUser()

    const [loading, setLoading] = useState<boolean>(false)
    const [profiles, setProfiles] = useState<Profile[]>([])

    const fetchProfiles = async () => {
        try {
            if (!user) return
            setLoading(true)
            let { data } = await supabase
                .from<Profile>('profiles')
                .select('id, email, username')

            if (!data) return
            const filteredData = data.filter(d => d.email !== user.email)
            setProfiles(filteredData)
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchProfiles()
    }, [user])

    const renderChat = ({ item }: { item: Profile }) => {
        const navigateToChatSession = () => {
            navigation.navigate('ChatSession', {
                currentChatUserId: item.id
            })
        }

        return <Chat username={item.username || item.email} navigateToChatSession={navigateToChatSession} />
    }

    return (
        <Layout>
            {loading && <Text style={tailwind('text-center mt-10 text-xl text-green-700')}>loading...</Text>}
            <FlatList
                data={profiles}
                renderItem={renderChat}
                keyExtractor={item => item.id}
            />
        </Layout>
    )
}