import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  NavigationContainer,
  type NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNotificacoes } from '../contexts/NotificacoesContext';
import type { SessaoDetalhada } from '../models/Sessao';
import { LoginScreen } from '../screens/Login';
import { RegisterScreen } from '../screens/Register';
import { FilmesScreen } from '../screens/Filmes';
import { SessoesScreen } from '../screens/Sessoes';
import { MeusIngressosScreen } from '../screens/MeusIngressos';
import { ComprarIngressoScreen } from '../screens/ComprarIngresso';
import { NotificacoesScreen } from '../screens/Notificacoes';
import { CadastroFilmeScreen } from '../screens/CadastroFilme';
import { colors } from '../theme/colors';
import { styles } from './styles';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Filmes: undefined;
  Sessoes: { filmeId?: number; filmeTitulo?: string } | undefined;
  MeusIngressos: undefined;
  Notificacoes: undefined;
  CadastroFilme: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<AppTabParamList>;
  ComprarIngresso: { sessao: SessaoDetalhada };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AppTab = createBottomTabNavigator<AppTabParamList>();

const MainTabs = () => {
  const { user } = useAuth();
  const { naoLidas } = useNotificacoes();

  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <AppTab.Screen
        name="Filmes"
        component={FilmesScreen}
        options={{
          title: 'Filmes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <AppTab.Screen
        name="Sessoes"
        component={SessoesScreen}
        options={{
          title: 'Sessões',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <AppTab.Screen
        name="MeusIngressos"
        component={MeusIngressosScreen}
        options={{
          title: 'Ingressos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={size} color={color} />
          ),
        }}
      />
      <AppTab.Screen
        name="Notificacoes"
        component={NotificacoesScreen}
        options={{
          title: 'Alertas',
          tabBarBadge: naoLidas > 0 ? naoLidas : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      {user?.role === 'ADMIN' ? (
        <AppTab.Screen
          name="CadastroFilme"
          component={CadastroFilmeScreen}
          options={{
            title: 'Admin',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />
      ) : null}
    </AppTab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isAuthenticated, loadingStorage } = useAuth();

  if (loadingStorage) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="MainTabs" component={MainTabs} />
          <AppStack.Screen
            name="ComprarIngresso"
            component={ComprarIngressoScreen}
          />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
