import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Account } from '../screens/Account'
import { Chats } from '../screens/Chats'
import { AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Chats'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: 'message1' | 'user' = 'message1'

                    if (route.name === 'Chats') {
                        iconName = 'message1'
                    } else if (route.name === 'Account') {
                        iconName = 'user'
                    }

                    return <AntDesign name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: '#064E3B',
                tabBarInactiveTintColor: '#D1D5DB'
            })}
        >
            <Tab.Screen name='Chats' component={Chats} options={{ headerTitle: 'chats' }} />
            <Tab.Screen name='Account' component={Account} options={{ headerTitle: 'account' }} />
        </Tab.Navigator>
    )
}