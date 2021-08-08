import React from 'react'
import { Text } from 'react-native'
import tailwind from 'tailwind-rn'
import { useUser } from '../context/UserContext'
import { Message as MessageModel } from '../models/Message'

interface props {
    message: MessageModel
}

export const Message = ({ message }: props) => {
    const { user } = useUser()

    return (
        <Text
            style={tailwind(`${user?.id === message.sender_id ? 'text-right pr-6 text-green-800' : 'text-left pl-6 text-yellow-800'} text-2xl py-2`)}
        >
            {message.message}
        </Text>
    )
}