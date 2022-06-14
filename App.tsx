import { StatusBar } from "expo-status-bar";
import React, { useEffect, createContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AppProvider } from "./context/AppContext";
import { StatProvider } from "./context/StatContext";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { argv } from "process";
export default function App() {
  Amplify.configure(awsconfig);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppProvider>
        <StatProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </StatProvider>
      </AppProvider>
    );
  }
}
