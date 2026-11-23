import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { NotificacoesProvider } from './src/contexts/NotificacoesContext';
import { NotificationToast } from './src/components/NotificationToast';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NotificacoesProvider>
          <StatusBar style="light" />
          <AppNavigator />
          <NotificationToast />
        </NotificacoesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
