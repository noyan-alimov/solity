import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import tailwind from 'tailwind-rn'

interface props {
    text: string
    onPress: () => void
    type: 'primary' | 'outlined'
    loading?: boolean
    marginTop?: string
}

export const Button = ({ text, onPress, type, loading, marginTop }: props) => {
    return (
        <View style={tailwind(`items-center mt-${marginTop ? marginTop : '10'}`)}>
            <TouchableOpacity
                style={tailwind(`items-center rounded-md px-6 py-2 ${type === 'primary' ? 'bg-green-700' : 'border border-green-700'}`)}
                disabled={loading}
                onPress={onPress}
            >
                <Text
                    style={tailwind(`text-xl text-center ${type === 'primary' ? 'text-white' : 'text-green-700'}`)}
                >
                    {loading ? 'loading' : text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}