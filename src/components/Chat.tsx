import React from 'react'
import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import tailwind from 'tailwind-rn'

interface props {
    username: string
}

export const Chat = ({ username }: props) => {
    return (
        <View style={tailwind('flex-row w-full my-6')}>
            <AntDesign
                style={tailwind('w-1/4 text-center')}
                name='dingding-o' 
                size={48}
                color='#064E3B'
            />
            <Text style={tailwind('w-2/4 text-3xl font-light text-green-800')}>{username}</Text>
            <AntDesign
                style={tailwind('w-1/4 text-center')}
                name='rightcircle'
                size={48}
                color='#DB2777'
            />
        </View>
    )
}