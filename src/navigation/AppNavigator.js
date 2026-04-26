import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '../store/useStore';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import ChatScreen from '../screens/main/ChatScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{ headerShown: false }} 
          />
        ) : (
          <>
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen} 
              options={({ route }) => ({ title: `${route.params.tripTitle} Chat`, headerBackTitle: 'Back' })} 
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen} 
              options={{ title: 'Notifications', headerBackTitle: 'Back' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
