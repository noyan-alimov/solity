import React, { ReactNode } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'tailwind-rn'

interface props {
    children: ReactNode
    center?: boolean
    ignoreSafeAreaView?: boolean
}

export const Layout = ({ children, center, ignoreSafeAreaView }: props) => {
    const { height } = useWindowDimensions()

    if (ignoreSafeAreaView) {
        return (
            <View
                style={{
                    ...tailwind(`bg-green-100 ${center ? 'items-center': ''}`),
                    height
                }}
            >
                {children}
            </View>
        )
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    ...tailwind(`bg-green-100 ${center ? 'items-center': ''}`),
                    height
                }}
            >
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}