// src/app/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

export default function RootNavigator() {
  // İleride: burada user login mi değil mi kontrol ederiz.
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
