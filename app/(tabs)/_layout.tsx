import { Tabs } from 'expo-router';
import { Chrome as Home, Users, Trophy, Plus, User } from 'lucide-react-native';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';

function TabBarIcon({ color, size, icon: Icon }) {
  return <Icon color={color} size={size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#1E1E1E',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          borderTopColor: '#333333',
          borderTopWidth: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          paddingHorizontal: 16,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground} />
        ),
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Home} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: 'Challenges',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Trophy} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.createButtonContainer}>
              <View style={styles.createButton}>
                <Plus color="#fff" size={24} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={Users} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon icon={User} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  createButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0D6EFD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#1E1E1E',
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    overflow: 'hidden',
  }
});