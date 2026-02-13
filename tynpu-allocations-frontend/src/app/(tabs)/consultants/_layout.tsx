import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function ConsultantsLayout() {
  return (
    <TopTabs screenOptions={{ tabBarActiveTintColor: '#2563eb' }}>
      <TopTabs.Screen name="index" options={{ title: 'List' }} />
      <TopTabs.Screen name="add" options={{ title: 'New' }} />
    </TopTabs>
  );
}