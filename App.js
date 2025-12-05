import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackRoutes from './src/routes/stack.routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#4A148C" />
        <StackRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}