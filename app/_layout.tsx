import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/lib/query-client";
import { GameProvider } from "@/lib/game-context";
import { LanguageProvider } from "@/lib/language-context";
import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from "@expo-google-fonts/outfit";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="quiz" options={{ headerShown: false, animation: 'slide_from_right' }} />
      <Stack.Screen name="results" options={{ headerShown: false, animation: 'slide_from_bottom', gestureEnabled: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  // On web, fonts are loaded via CSS <link> in +html.tsx — no JS loader needed.
  // On native, useFonts fetches and registers the font assets.
  const [fontsLoaded, fontError] = useFonts(
    Platform.OS === 'web'
      ? {}
      : {
          Outfit_400Regular,
          Outfit_500Medium,
          Outfit_600SemiBold,
          Outfit_700Bold,
        }
  );

  useEffect(() => {
    if (fontsLoaded || fontError || Platform.OS === 'web') {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError && Platform.OS !== 'web') return null;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <KeyboardProvider>
            <LanguageProvider>
              <GameProvider>
                <StatusBar style="light" />
                <RootLayoutNav />
              </GameProvider>
            </LanguageProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
