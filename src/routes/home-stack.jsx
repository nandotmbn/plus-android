import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Overview from '../screens/home/overview';
import Add from '../screens/home/add';
import Monitor from '../screens/home/monitor';
import History from '../screens/home/history';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Monitor" component={Monitor} />
            <Stack.Screen name="Riwayat" component={History} />
        </Stack.Navigator>
    );
}