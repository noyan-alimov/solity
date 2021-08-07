import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Account } from '../screens/Account'
import { Chats } from '../screens/Chats'
import { AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const MainApp = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Account'
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
                    tabBarInactiveTintColor: '#34D399'
                })}
            >
                <Tab.Screen name='Chats' component={Chats} />
                <Tab.Screen name='Account' component={Account} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}