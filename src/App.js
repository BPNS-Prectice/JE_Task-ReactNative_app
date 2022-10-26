import React from "react";
import { StatusBar } from "react-native";
// import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import Navigation from "./navigations";
import { UserProvider } from "./contexts";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
        <Navigation />
      </UserProvider>
    </ThemeProvider>
  );
}
