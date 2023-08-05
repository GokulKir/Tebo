import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper';
import App from './App'

export default function Main() {
  return (
    <PaperProvider>
        <App/>
    </PaperProvider>
    
  )
}

