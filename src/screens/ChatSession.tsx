import React from 'react'
import { TextInput, View, FlatList, ListRenderItemInfo } from 'react-native'
import tailwind from 'tailwind-rn'
import { Layout } from '../components/Layout'
import { Message } from '../components/Message'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { Message as MessageModel } from '../models/Message'
import { supabase } from '../supabaseClient'
import { useEffect } from 'react'
import { createMessage } from '../fetchers/createMessage'
import { RouteProp } from '@react-navigation/native'
import { useMemo } from 'react'
import { useUser } from '../context/UserContext'
import { useRef } from 'react'

interface props {
    route: RouteProp<any>
}

export const ChatSession = ({ route }: props) => {
    const { user } = useUser()
    const flatListRef = useRef<FlatList>(null)

    const currentChatUserId = useMemo(() => {
        return route.params!.currentChatUserId
    }, [route])

    const [messages, setMessages] = useState<MessageModel[]>([])

    const fetchMessages = async () => {
        try {
            const { data } = await supabase
                .from<MessageModel>('messages')
                .select('id, message, receiver_id, sender_id')
                .or(`receiver_id.eq.${user?.id}, receiver_id.eq.${currentChatUserId}`)
                .or(`sender_id.eq.${currentChatUserId}, sender_id.eq.${user?.id}`)

            if (!data) return

            setMessages(data)
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true })
            }, 300)
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const [text, setText] = useState<string>('')

    const sendMessage = () => {
        if (text.length <= 0) {
            alert('please enter a message')
            return
        }

        createMessage({
            message: text,
            sender_id: user!.id,
            receiver_id: currentChatUserId
        })
            .then(() => {
                fetchMessages()
            })

        setText('')
    }

    const renderMessage = (item: ListRenderItemInfo<MessageModel>) => (
        <Message key={item.item.id} message={item.item} />
    )

    return (
        <Layout ignoreSafeAreaView>
            <View style={tailwind('h-4/5')}>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    ref={flatListRef}
                />
            </View>
            <View style={tailwind('w-full flex-row bg-green-200 pl-6 h-24')}>
                <TextInput
                    style={tailwind('w-4/5 text-2xl justify-center text-green-800')}
                    autoCapitalize='none'
                    placeholder='type a message'
                    value={text}
                    onChangeText={setText}
                />
                <View style={tailwind('items-center justify-center w-1/5')}>
                    <AntDesign name="upcircle" size={40} color="#DB2777" onPress={sendMessage} />
                </View>
            </View>
        </Layout>
    )
}