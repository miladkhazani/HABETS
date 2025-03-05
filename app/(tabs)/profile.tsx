import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Settings, Award, TrendingUp, Calendar, Clock, Edit, LogOut, ChevronRight, Bell, Shield, CreditCard, HelpCircle, User as UserIcon, Heart, Star } from 'lucide-react-native';
import { useAuth } from '@/store/authStore';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for achievements
const ACHIEVEMENTS = [
  {
    id: '1',
    title: 'Early Bird',
    description: 'Completed 5 morning challenges',
    icon: Award,
    color: '#FF6B00',
    progress: 100,
  },
  {
    id: '2',
    title: 'Streak Master',
    description: '30-day perfect streak',
    icon: TrendingUp,
    color: '#4CAF50',
    progress: 100,
  },
  {
    id: '3',
    title: 'Consistent',
    description: 'Completed 10 challenges',
    icon: Calendar,
    color: '#4DA8DA',
    progress: 80,
  },
  {
    id: '4',
    title: 'Social Butterfly',
    description: 'Connected with 10 friends',
    icon: Heart,
    color: '#FF4D4D',
    progress: 70,
  },
  {
    id: '5',
    title: 'Champion',
    description: 'Won 5 challenges',
    icon: Star,
    color: '#FFC107',
    progress: 60,
  }
];

// Mock data for activity history
const ACTIVITY_HISTORY = [
  {
    id: '1',
    title: 'Won Morning Run Challenge',
    description: 'You won $250 in the group challenge',
    icon: Award,
    color: '#FF6B00',
    time: '2d ago',
  },
  {
    id: '2',
    title: 'New Personal Best',
    description: 'Ran 8.5km in the Marathon Prep challenge',
    icon: TrendingUp,
    color: '#4DA8DA',
    time: '5d ago',
  },
  {
    id: '3',
    title: 'Joined Digital Detox Challenge',
    description: 'Contributed $50 to the challenge pot',
    icon: Calendar,
    color: '#4DA8DA',
    time: '1w ago',
  }
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>PROFILE</Text>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Bell size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Settings size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={['rgba(13, 110, 253, 0.1)', 'rgba(13, 110, 253, 0.05)']}
              style={styles.profileCardGradient}
            />
            
            <View style={styles.profileHeader}>
              <View style={styles.profileImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop' }} 
                  style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editButton}>
                  <Edit size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.profileName}>{user?.name || 'Demo User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              
              <View style={styles.profileBadge}>
                <Star size={14} color="#FFFFFF" />
                <Text style={styles.profileBadgeText}>Premium Member</Text>
              </View>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Challenges</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Friends</Text>
              </View>
            </View>
          </View>
          
          {/* Achievements Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsContainer}
            >
              {ACHIEVEMENTS.map(achievement => {
                const IconComponent = achievement.icon;
                return (
                  <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
                    <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                      <IconComponent size={24} color={achievement.color} />
                    </View>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDesc}>{achievement.description}</Text>
                    
                    <View style={styles.achievementProgressContainer}>
                      <View 
                        style={[
                          styles.achievementProgressBar, 
                          { 
                            width: `${achievement.progress}%`,
                            backgroundColor: achievement.color
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.achievementProgressText}>{achievement.progress}%</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          
          {/* Activity History Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ACTIVITY HISTORY</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.activityList}>
              {ACTIVITY_HISTORY.map(activity => {
                const IconComponent = activity.icon;
                return (
                  <TouchableOpacity key={activity.id} style={styles.activityItem}>
                    <View style={[styles.activityIconContainer, { backgroundColor: `${activity.color}20` }]}>
                      <IconComponent size={20} color={activity.color} />
                    </View>
                    
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>{activity.title}</Text>
                      <Text style={styles.activityDesc}>{activity.description}</Text>
                    </View>
                    
                    <View style={styles.activityTime}>
                      <Clock size={14} color="#A0A0A0" />
                      <Text style={styles.activityTimeText}>{activity.time}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          
          {/* Settings Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SETTINGS</Text>
            </View>
            
            <View style={styles.settingsList}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#4DA8DA20' }]}>
                  <UserIcon size={20} color="#4DA8DA" />
                </View>
                <Text style={styles.settingText}>Account Settings</Text>
                <ChevronRight size={20} color="#A0A0A0" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#FF6B0020' }]}>
                  <Bell size={20} color="#FF6B00" />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
                <ChevronRight size={20} color="#A0A0A0" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#4CAF5020' }]}>
                  <Shield size={20} color="#4CAF50" />
                </View>
                <Text style={styles.settingText}>Privacy & Security</Text>
                <ChevronRight size={20} color="#A0A0A0" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#FFC10720' }]}>
                  <CreditCard size={20} color="#FFC107" />
                </View>
                <Text style={styles.settingText}>Payment Methods</Text>
                <ChevronRight size={20} color="#A0A0A0" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={[styles.settingIconContainer, { backgroundColor: '#9C27B020' }]}>
                  <HelpCircle size={20} color="#9C27B0" />
                </View>
                <Text style={styles.settingText}>Help & Support</Text>
                <ChevronRight size={20} color="#A0A0A0" />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color="#FF4D4D" />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    position: 'relative',
  },
  profileCardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4DA8DA',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 12,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  profileBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#A0A0A0',
    letterSpacing: 1,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4DA8DA',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    paddingRight: 10,
  },
  achievementCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 160,
    borderWidth: 1,
    borderColor: '#333333',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 12,
    height: 32, // Fixed height for 2 lines
  },
  achievementProgressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  achievementProgressBar: {
    height: 4,
    borderRadius: 2,
  },
  achievementProgressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
  },
  activityList: {
    paddingHorizontal: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  activityTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  activityTimeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 4,
  },
  settingsList: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.3)',
  },
  logoutButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FF4D4D',
    marginLeft: 8,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
});