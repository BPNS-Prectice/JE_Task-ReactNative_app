import React from "react";
import { StatusBar } from "react-native";
// import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Navigation from "./navigations";
import { UserProvider, ProgressProvider } from "./contexts";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <UserProvider>
          <StatusBar  // 헤더
            backgroundColor={theme.background}
            barStyle="dark-content"
          />
          <Navigation />
        </UserProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}
