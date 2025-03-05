import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Platform, Image, Dimensions } from 'react-native';
import { useAuth } from '@/store/authStore';
import { ChevronLeft, ChevronRight, Calendar, CircleCheck as CheckCircle, Clock, Plus, Trophy, Target, Activity, Flame } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Svg, { Circle, G } from 'react-native-svg';

export default function HomeScreen() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState(3); // 0-6 for days of week
  
  // Mock data for the weekly progress
  const weeklyProgress = {
    successRate: 85,
    days: [
      { day: 'M', completed: 3, total: 3 },
      { day: 'T', completed: 2, total: 3 },
      { day: 'W', completed: 3, total: 3 },
      { day: 'T', completed: 2, total: 3 },
      { day: 'F', completed: 3, total: 3 },
      { day: 'S', completed: 1, total: 3 },
      { day: 'S', completed: 2, total: 3 },
    ]
  };

  // Mock data for today's habits
  const todaysHabits = [
    {
      id: '1',
      title: 'Morning Run',
      subtitle: '5km goal',
      time: '8:00 AM',
      completed: true,
      progress: 100,
      color: '#FF6B00'
    },
    {
      id: '2',
      title: 'Meditation',
      subtitle: '15 min',
      time: '7:00 PM',
      completed: false,
      progress: 0,
      color: '#4DA8DA'
    },
    {
      id: '3',
      title: 'Screen Time',
      subtitle: 'Max 2 hours',
      time: 'All Day',
      completed: false,
      progress: 60,
      color: '#4DA8DA'
    }
  ];

  // Calculate overall progress
  const totalHabits = todaysHabits.length;
  const completedHabits = todaysHabits.filter(habit => habit.completed).length;
  const progressPercentage = (completedHabits / totalHabits) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header with Logo */}
          <View style={styles.headerWithLogo}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>H</Text>
            </View>
          </View>
          
          {/* Date Navigation */}
          <View style={styles.dateNavigation}>
            <TouchableOpacity style={styles.dateArrow}>
              <ChevronLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text style={styles.dateTitle}>TODAY</Text>
            
            <TouchableOpacity style={styles.dateArrow}>
              <ChevronRight size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Progress Circle */}
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircleWrapper}>
              <View style={styles.progressCircle}>
                <Svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
                  {/* Background Circle */}
                  <Circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={(circleSize - 10) / 2}
                    stroke="#1E1E1E"
                    strokeWidth={10}
                    fill="transparent"
                  />
                  
                  {/* Progress Circle */}
                  {progressPercentage > 0 && (
                    <Circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={(circleSize - 10) / 2}
                      stroke="#FF6B00"
                      strokeWidth={10}
                      fill="transparent"
                      strokeDasharray={Math.PI * (circleSize - 10)}
                      strokeDashoffset={Math.PI * (circleSize - 10) * (1 - progressPercentage / 100)}
                      strokeLinecap="round"
                      transform={`rotate(-90, ${circleSize / 2}, ${circleSize / 2})`}
                    />
                  )}
                </Svg>
                
                {/* Inner Circle with Text */}
                <View style={styles.progressInnerCircle}>
                  <Text style={styles.progressPercentage}>{completedHabits}/{totalHabits}</Text>
                  <Text style={styles.progressLabel}>Completed</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85<Text style={styles.statUnit}>%</Text></Text>
                <Text style={styles.statLabel}>RECOVERY</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>STREAK</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>CHALLENGES</Text>
              </View>
            </View>
          </View>
          
          {/* Day Selector */}
          <View style={styles.daySelector}>
            {weeklyProgress.days.map((day, index) => {
              const isSelected = index === selectedDay;
              const completionRate = (day.completed / day.total) * 100;
              
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.dayItem,
                    isSelected && styles.selectedDayItem
                  ]}
                  onPress={() => setSelectedDay(index)}
                >
                  <Text style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText
                  ]}>
                    {day.day}
                  </Text>
                  
                  <View style={[
                    styles.dayDot,
                    completionRate === 100 && styles.completedDayDot,
                    completionRate > 0 && completionRate < 100 && styles.partialDayDot,
                    isSelected && styles.selectedDayDot
                  ]} />
                </TouchableOpacity>
              );
            })}
          </View>
          
          {/* Today's Activities Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY'S ACTIVITIES</Text>
            <TouchableOpacity style={styles.expandButton}>
              <View style={styles.expandIcon} />
            </TouchableOpacity>
          </View>
          
          {/* Habits List */}
          <View style={styles.habitsList}>
            {todaysHabits.map((habit) => (
              <TouchableOpacity key={habit.id} style={styles.habitCard}>
                <View style={[styles.habitIconContainer, { backgroundColor: habit.color }]}>
                  {habit.id === '1' ? (
                    <Activity size={24} color="#FFFFFF" />
                  ) : habit.id === '2' ? (
                    <Target size={24} color="#FFFFFF" />
                  ) : (
                    <Clock size={24} color="#FFFFFF" />
                  )}
                </View>
                
                <View style={styles.habitContent}>
                  <View style={styles.habitHeader}>
                    <Text style={styles.habitTitle}>{habit.title}</Text>
                    <Text style={styles.habitTime}>{habit.time}</Text>
                  </View>
                  
                  <Text style={styles.habitSubtitle}>{habit.subtitle}</Text>
                  
                  <View style={styles.habitProgressContainer}>
                    <View 
                      style={[
                        styles.habitProgressBar, 
                        { 
                          width: `${habit.progress}%`,
                          backgroundColor: habit.color
                        }
                      ]} 
                    />
                  </View>
                </View>
                
                {habit.completed ? (
                  <View style={[styles.habitCheckbox, { backgroundColor: habit.color }]}>
                    <CheckCircle size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.habitCheckbox} />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity style={styles.addActivityButton}>
              <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Featured Challenges */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FEATURED CHALLENGES</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengesContainer}
          >
            <TouchableOpacity style={styles.challengeCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop' }} 
                style={styles.challengeImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.challengeGradient}
              />
              <View style={styles.challengeContent}>
                <View style={styles.challengeBadge}>
                  <Flame size={14} color="#FFFFFF" />
                  <Text style={styles.challengeBadgeText}>$250</Text>
                </View>
                <Text style={styles.challengeTitle}>Marathon Prep</Text>
                <Text style={styles.challengeSubtitle}>10 miles/week • 8 weeks</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.challengeCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=3387&auto=format&fit=crop' }} 
                style={styles.challengeImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.challengeGradient}
              />
              <View style={styles.challengeContent}>
                <View style={styles.challengeBadge}>
                  <Flame size={14} color="#FFFFFF" />
                  <Text style={styles.challengeBadgeText}>$100</Text>
                </View>
                <Text style={styles.challengeTitle}>Digital Detox</Text>
                <Text style={styles.challengeSubtitle}>Max 1hr screen time • 14 days</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.challengeCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=3271&auto=format&fit=crop' }} 
                style={styles.challengeImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.challengeGradient}
              />
              <View style={styles.challengeContent}>
                <View style={styles.challengeBadge}>
                  <Flame size={14} color="#FFFFFF" />
                  <Text style={styles.challengeBadgeText}>$150</Text>
                </View>
                <Text style={styles.challengeTitle}>Meditation Master</Text>
                <Text style={styles.challengeSubtitle}>15min daily • 30 days</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const { width } = Dimensions.get('window');
const circleSize = width * 0.5;

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
    paddingBottom: 30,
  },
  headerWithLogo: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dateArrow: {
    padding: 8,
  },
  dateTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginHorizontal: 20,
    letterSpacing: 1,
  },
  progressCircleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressCircleWrapper: {
    width: circleSize,
    height: circleSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: circleSize,
    height: circleSize,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressInnerCircle: {
    position: 'absolute',
    width: circleSize - 40,
    height: circleSize - 40,
    borderRadius: (circleSize - 40) / 2,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#FFFFFF',
  },
  progressLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  statUnit: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333333',
    alignSelf: 'center',
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dayItem: {
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
  selectedDayItem: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  completedDayDot: {
    backgroundColor: '#FF6B00',
  },
  partialDayDot: {
    backgroundColor: '#4DA8DA',
  },
  selectedDayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  expandButton: {
    padding: 4,
  },
  expandIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#A0A0A0',
  },
  habitsList: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  habitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  habitContent: {
    flex: 1,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  habitTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  habitTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  habitSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  habitProgressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    width: '100%',
  },
  habitProgressBar: {
    height: 4,
    borderRadius: 2,
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333333',
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addActivityButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: '#FF6B00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  challengesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  challengeCard: {
    width: 280,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  challengeGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  challengeContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  challengeBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  challengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  challengeSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
});