import { StatusBar } from 'expo-status-bar';
import React, { useEffect, createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppProvider } from './context/AppContext'
import { PlayProvider } from './context/PlayContext'
import { StatProvider } from './context/StatContext'

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <AppProvider>
        <PlayProvider>
          <StatProvider>
            <SafeAreaProvider >
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </StatProvider>
        </PlayProvider>
      </AppProvider>
    );
  }
}
