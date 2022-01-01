import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Encyclopedia from '../screens/encyclopedia/encyclopedia';
import Detail from '../screens/encyclopedia/detail';

const Stack = createStackNavigator();

export default function EncyclopediaStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            <Stack.Screen name="Encylopedia" component={Encyclopedia} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
}