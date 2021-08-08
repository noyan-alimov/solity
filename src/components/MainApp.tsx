import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabNavigator } from './TabNavigator'
import { ChatSession } from '../screens/ChatSession'

const Stack = createNativeStackNavigator()

export const MainApp = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='TabNavigator'>
                <Stack.Screen
                    name='TabNavigator'
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ChatSession'
                    component={ChatSession}
                    options={{ headerTitle: 'chat', headerBackTitle: 'back' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}