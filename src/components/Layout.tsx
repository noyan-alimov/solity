import React, { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'tailwind-rn'

interface props {
    children: ReactNode
    center?: boolean
}

export const Layout = ({ children, center }: props) => {
    const { height } = useWindowDimensions()

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