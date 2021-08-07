import React from 'react'
import { FlatList } from 'react-native'
import { Chat } from '../components/Chat'
import { Layout } from '../components/Layout'
import { data } from '../data'

export const Chats = () => {
    const renderChat = ({ item }: any) => (
        <Chat username={item.username} />
    )

    return (
        <Layout>
            <FlatList
                data={data}
                renderItem={renderChat}
                keyExtractor={item => item.id}
            />
        </Layout>
    )
}