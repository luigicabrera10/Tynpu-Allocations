import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen 
        name="consultants" 
        options={{ title: 'Consultants', tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="projects" 
        options={{ title: 'Projects', tabBarIcon: ({ color }) => <Ionicons name="briefcase" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="allocations" 
        options={{ title: 'Allocations', tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} /> }} 
      />
    </Tabs>
  );
}