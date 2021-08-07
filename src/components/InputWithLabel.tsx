import React from 'react'
import { View, TextInput, Text } from 'react-native'
import tailwind from 'tailwind-rn'

interface InputWithLabelProps {
    label: string
    value: string
    onChangeText?: (value: string) => void
    disabled?: boolean
    marginTop?: string
}

export const InputWithLabel = ({ label, value, onChangeText, disabled, marginTop }: InputWithLabelProps) => {
    return (
        <View style={tailwind(`mt-${marginTop ? marginTop : '10'} w-full items-center`)}>
            <View style={tailwind('w-3/4')}>
                <Text style={tailwind('text-2xl font-light text-green-700')}>{label}</Text>
            </View>
            <TextInput
                style={tailwind('border border-green-400 p-2 rounded-md text-2xl text-green-700 w-3/4')}
                value={value}
                onChangeText={onChangeText ? onChangeText : undefined}
                editable={disabled ? false : true}
                autoCapitalize={'none'}
            />
        </View>
    )
}