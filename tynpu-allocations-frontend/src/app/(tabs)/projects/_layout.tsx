import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function ProjectsLayout() {
  return (
    <TopTabs screenOptions={{ tabBarLabelStyle: { fontWeight: 'bold' } }}>
      <TopTabs.Screen name="index" options={{ title: 'List' }} />
      <TopTabs.Screen name="add" options={{ title: 'Add New' }} />
    </TopTabs>
  );
}