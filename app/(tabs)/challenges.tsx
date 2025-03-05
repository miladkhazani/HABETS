import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Dimensions, StatusBar, Platform, SafeAreaView } from 'react-native';
import { Search, Filter, Trophy, Users, Calendar, X, Award, ChevronDown, Flame, Clock, Target, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for challenge types
const CHALLENGE_TYPES = {
  DAILY_TARGET: 'daily_target',
  CUMULATIVE: 'cumulative'
};

// Mock data for the challenges
const mockChallenges = [
  {
    id: '1',
    title: 'Morning Run Challenge',
    description: 'Run at least 5km every morning for 30 days. Track your progress with your fitness app.',
    type: CHALLENGE_TYPES.DAILY_TARGET,
    targetValue: 5,
    targetUnit: 'km',
    duration: 30,
    currentDay: 12,
    potAmount: 250,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop',
    category: 'Fitness',
    participants: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [5.2, 5.5, 4.8, 6.1, 5.0, 5.3, 4.9, 6.5, 5.7, 5.2, 6.3, 5.8],
        totalProgress: 65.3,
        completedDays: 10,
        streakDays: 8,
        isCurrentUser: false
      },
      {
        id: '2',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [4.8, 5.1, 5.3, 4.9, 5.2, 5.0, 4.7, 5.5, 5.2, 4.9, 5.3, 5.1],
        totalProgress: 61.0,
        completedDays: 12,
        streakDays: 12,
        isCurrentUser: false
      },
      {
        id: '3',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [4.5, 4.8, 5.0, 4.7, 4.9, 5.1, 4.6, 4.9, 5.2, 4.8, 5.0, 4.7],
        totalProgress: 58.2,
        completedDays: 9,
        streakDays: 5,
        isCurrentUser: false
      },
      {
        id: '4',
        name: 'Emily Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [5.0, 5.2, 4.9, 5.3, 5.1, 5.4, 5.2, 5.5, 5.3, 5.0, 5.2, 5.4],
        totalProgress: 62.5,
        completedDays: 11,
        streakDays: 7,
        isCurrentUser: true
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [4.2, 4.5, 4.8, 4.3, 4.6, 4.9, 4.4, 4.7, 5.0, 4.5, 4.8, 4.6],
        totalProgress: 55.3,
        completedDays: 8,
        streakDays: 3,
        isCurrentUser: false
      }
    ]
  },
  {
    id: '2',
    title: 'Screen Time Reduction',
    description: 'Limit your daily screen time to 2 hours or less for 14 days. Track using your phone\'s screen time feature.',
    type: CHALLENGE_TYPES.DAILY_TARGET,
    targetValue: 2,
    targetUnit: 'hours',
    duration: 14,
    currentDay: 5,
    potAmount: 150,
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=3387&auto=format&fit=crop',
    category: 'Digital Wellbeing',
    participants: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [1.8, 1.5, 1.9, 2.1, 1.7],
        totalProgress: 9.0,
        completedDays: 3,
        streakDays: 3,
        isCurrentUser: false
      },
      {
        id: '2',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [1.5, 1.8, 1.6, 1.4, 1.7],
        totalProgress: 8.0,
        completedDays: 5,
        streakDays: 5,
        isCurrentUser: false
      },
      {
        id: '4',
        name: 'Emily Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [2.2, 1.9, 2.1, 1.8, 1.6],
        totalProgress: 9.6,
        completedDays: 2,
        streakDays: 0,
        isCurrentUser: true
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [1.2, 1.5, 1.3, 1.4, 1.6],
        totalProgress: 7.0,
        completedDays: 5,
        streakDays: 5,
        isCurrentUser: false
      }
    ]
  },
  {
    id: '3',
    title: 'Marathon Prep Challenge',
    description: 'Run as many kilometers as possible in 60 days. The person with the most distance wins the pot!',
    type: CHALLENGE_TYPES.CUMULATIVE,
    targetUnit: 'km',
    duration: 60,
    currentDay: 8,
    potAmount: 300,
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=3271&auto=format&fit=crop',
    category: 'Fitness',
    participants: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [8.2, 7.5, 9.8, 6.1, 8.0, 7.3, 9.9, 6.5],
        totalProgress: 63.3,
        isCurrentUser: false
      },
      {
        id: '2',
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [7.8, 8.1, 7.3, 8.9, 7.2, 8.0, 7.7, 8.5],
        totalProgress: 63.5,
        isCurrentUser: false
      },
      {
        id: '3',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [6.5, 7.8, 6.0, 7.7, 6.9, 7.1, 6.6, 7.9],
        totalProgress: 56.5,
        isCurrentUser: false
      },
      {
        id: '4',
        name: 'Emily Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [9.0, 8.2, 9.9, 8.3, 9.1, 8.4, 9.2, 8.5],
        totalProgress: 70.6,
        isCurrentUser: true
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: [7.2, 6.5, 7.8, 6.3, 7.6, 6.9, 7.4, 6.7],
        totalProgress: 56.4,
        isCurrentUser: false
      }
    ]
  },
  {
    id: '4',
    title: 'Meditation Master',
    description: 'Meditate for at least 15 minutes every day for 30 days to build a lasting mindfulness habit.',
    type: CHALLENGE_TYPES.DAILY_TARGET,
    targetValue: 15,
    targetUnit: 'minutes',
    duration: 30,
    currentDay: 18,
    potAmount: 200,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=3270&auto=format&fit=crop',
    category: 'Mindfulness',
    participants: [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: Array(18).fill(0).map(() => Math.floor(Math.random() * 10) + 15),
        totalProgress: 320,
        completedDays: 18,
        streakDays: 18,
        isCurrentUser: false
      },
      {
        id: '4',
        name: 'Emily Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
        dailyProgress: Array(18).fill(0).map(() => Math.floor(Math.random() * 10) + 12),
        totalProgress: 280,
        completedDays: 15,
        streakDays: 8,
        isCurrentUser: true
      }
    ]
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'digital', name: 'Digital Wellbeing' },
  { id: 'nutrition', name: 'Nutrition' }
];

export default function ChallengesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showParticipantDetails, setShowParticipantDetails] = useState(false);

  // Filter challenges based on search query and category
  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           challenge.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const openChallengeDetails = (challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
    // Sort participants by total progress for leaderboard
    const sortedParticipants = [...challenge.participants].sort((a, b) => b.totalProgress - a.totalProgress);
    // Set the first participant as selected by default
    setSelectedParticipant(sortedParticipants[0]);
    setCurrentPage(0);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowParticipantDetails(false);
  };

  const handleParticipantPress = (participant) => {
    setSelectedParticipant(participant);
    setShowParticipantDetails(true);
  };

  const handleBackToLeaderboard = () => {
    setShowParticipantDetails(false);
  };

  const nextParticipant = () => {
    if (selectedChallenge) {
      const sortedParticipants = [...selectedChallenge.participants].sort((a, b) => b.totalProgress - a.totalProgress);
      const currentIndex = sortedParticipants.findIndex(p => p.id === selectedParticipant.id);
      const nextIndex = (currentIndex + 1) % sortedParticipants.length;
      setSelectedParticipant(sortedParticipants[nextIndex]);
      setCurrentPage(nextIndex);
    }
  };

  const prevParticipant = () => {
    if (selectedChallenge) {
      const sortedParticipants = [...selectedChallenge.participants].sort((a, b) => b.totalProgress - a.totalProgress);
      const currentIndex = sortedParticipants.findIndex(p => p.id === selectedParticipant.id);
      const prevIndex = (currentIndex - 1 + sortedParticipants.length) % sortedParticipants.length;
      setSelectedParticipant(sortedParticipants[prevIndex]);
      setCurrentPage(prevIndex);
    }
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
            <Text style={styles.headerTitle}>CHALLENGES</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color="#A0A0A0" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search challenges"
                  placeholderTextColor="#808080"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color="#FF6B00" />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Category Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.selectedCategoryText
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'active' && styles.activeTab]}
              onPress={() => setActiveTab('active')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}
              >
                Active
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
              onPress={() => setActiveTab('completed')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Featured Challenge */}
          <View style={styles.featuredContainer}>
            <TouchableOpacity 
              style={styles.featuredChallenge}
              onPress={() => openChallengeDetails(filteredChallenges[0])}
            >
              <Image 
                source={{ uri: filteredChallenges[0]?.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=3270&auto=format&fit=crop' }} 
                style={styles.featuredImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.featuredGradient}
              />
              
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Flame size={14} color="#FFFFFF" />
                  <Text style={styles.featuredBadgeText}>
                    ${filteredChallenges[0]?.potAmount || 250}
                  </Text>
                </View>
                
                <Text style={styles.featuredTitle}>
                  {filteredChallenges[0]?.title || 'Morning Run Challenge'}
                </Text>
                
                <View style={styles.featuredMeta}>
                  <View style={styles.featuredMetaItem}>
                    <Calendar size={14} color="#E0E0E0" />
                    <Text style={styles.featuredMetaText}>
                      Day {filteredChallenges[0]?.currentDay || 12} of {filteredChallenges[0]?.duration || 30}
                    </Text>
                  </View>
                  
                  <View style={styles.featuredMetaItem}>
                    <Users size={14} color="#E0E0E0" />
                    <Text style={styles.featuredMetaText}>
                      {filteredChallenges[0]?.participants.length || 5} participants
                    </Text>
                  </View>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${(filteredChallenges[0]?.currentDay / filteredChallenges[0]?.duration) * 100 || 40}%` 
                      }
                    ]} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Challenge List */}
          <View style={styles.challengesList}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>ALL CHALLENGES</Text>
              <TouchableOpacity>
                <Text style={styles.sectionAction}>SORT BY</Text>
              </TouchableOpacity>
            </View>
            
            {filteredChallenges.map(challenge => (
              <TouchableOpacity 
                key={challenge.id}
                style={styles.challengeCard}
                onPress={() => openChallengeDetails(challenge)}
              >
                <View style={styles.challengeImageContainer}>
                  <Image 
                    source={{ uri: challenge.image }} 
                    style={styles.challengeImage}
                  />
                  <View style={styles.challengeCategory}>
                    <Tag size={12} color="#FFFFFF" />
                    <Text style={styles.challengeCategoryText}>{challenge.category}</Text>
                  </View>
                </View>
                
                <View style={styles.challengeContent}>
                  <View style={styles.challengeHeader}>
                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                    <View style={styles.potContainer}>
                      <Flame size={14} color="#FF6B00" />
                      <Text style={styles.potAmount}>${challenge.potAmount}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.challengeMeta}>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#A0A0A0" />
                      <Text style={styles.metaText}>
                        {challenge.duration} days
                      </Text>
                    </View>
                    
                    <View style={styles.metaItem}>
                      <Users size={14} color="#A0A0A0" />
                      <Text style={styles.metaText}>
                        {challenge.participants.length} joined
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.challengeProgressContainer}>
                    <View style={styles.challengeProgressInfo}>
                      <Text style={styles.progressText}>
                        Day {challenge.currentDay} of {challenge.duration}
                      </Text>
                      <Text style={styles.progressPercentage}>
                        {Math.round((challenge.currentDay / challenge.duration) * 100)}%
                      </Text>
                    </View>
                    
                    <View style={styles.challengeProgressBarContainer}>
                      <View 
                        style={[
                          styles.challengeProgressBar, 
                          { width: `${(challenge.currentDay / challenge.duration) * 100}%` }
                        ]} 
                      />
                    </View>
                  </View>
                  
                  <View style={styles.participantsPreview}>
                    {challenge.participants.slice(0, 3).map((participant, index) => (
                      <Image 
                        key={participant.id}
                        source={{ uri: participant.avatar }} 
                        style={[
                          styles.participantAvatar,
                          { marginLeft: index > 0 ? -10 : 0 }
                        ]}
                      />
                    ))}
                    
                    {challenge.participants.length > 3 && (
                      <View style={styles.moreParticipants}>
                        <Text style={styles.moreParticipantsText}>
                          +{challenge.participants.length - 3}
                        </Text>
                      </View>
                    )}
                    
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsText}>View Details</Text>
                      <ArrowRight size={14} color="#4DA8DA" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Challenge Details Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalLogo}>
                <Trophy size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.modalTitle}>
                {selectedChallenge?.title || 'Challenge Details'}
              </Text>
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={closeModal}
              >
                <X size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {selectedChallenge && !showParticipantDetails && (
              <ScrollView style={styles.modalScrollContent}>
                {/* Challenge Meta Info */}
                <View style={styles.modalChallengeInfo}>
                  <View style={styles.modalInfoRow}>
                    <View style={styles.modalInfoItem}>
                      <Calendar size={16} color="#A0A0A0" />
                      <Text style={styles.modalInfoText}>
                        Day {selectedChallenge.currentDay} of {selectedChallenge.duration}
                      </Text>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Trophy size={16} color="#FF6B00" />
                      <Text style={styles.modalInfoText}>
                        ${selectedChallenge.potAmount} prize pool
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalProgressContainer}>
                    <View style={styles.modalProgressInfo}>
                      <Text style={styles.modalProgressText}>Challenge Progress</Text>
                      <Text style={styles.modalProgressPercentage}>
                        {Math.round((selectedChallenge.currentDay / selectedChallenge.duration) * 100)}%
                      </Text>
                    </View>
                    <View style={styles.modalProgressBarContainer}>
                      <View 
                        style={[
                          styles.modalProgressBar, 
                          { width: `${(selectedChallenge.currentDay / selectedChallenge.duration) * 100}%` }
                        ]} 
                      />
                    </View>
                  </View>
                </View>

                {/* Challenge Description */}
                <View style={styles.modalDescriptionContainer}>
                  <Text style={styles.modalDescriptionTitle}>Description</Text>
                  <Text style={styles.modalDescriptionText}>{selectedChallenge.description}</Text>
                </View>

                {/* Leaderboard */}
                <View style={styles.modalLeaderboardContainer}>
                  <Text style={styles.modalLeaderboardTitle}>Leaderboard</Text>
                  
                  {selectedChallenge.participants
                    .sort((a, b) => b.totalProgress - a.totalProgress)
                    .map((participant, index) => (
                      <TouchableOpacity 
                        key={participant.id} 
                        style={[
                          styles.modalParticipantItem, 
                          participant.isCurrentUser && styles.modalCurrentUserItem
                        ]}
                        onPress={() => handleParticipantPress(participant)}
                      >
                        <View style={styles.modalParticipantRank}>
                          {index === 0 ? (
                            <View style={styles.modalFirstPlaceBadge}>
                              <Award size={16} color="#FFFFFF" />
                            </View>
                          ) : (
                            <Text style={styles.modalRankText}>#{index + 1}</Text>
                          )}
                        </View>
                        
                        <Image source={{ uri: participant.avatar }} style={styles.modalParticipantAvatar} />
                        
                        <View style={styles.modalParticipantInfo}>
                          <Text style={styles.modalParticipantName}>
                            {participant.name} {participant.isCurrentUser && '(You)'}
                          </Text>
                          
                          <View style={styles.modalParticipantProgressContainer}>
                            <View 
                              style={[
                                styles.modalParticipantProgressBar, 
                                { 
                                  width: `${(participant.totalProgress / selectedChallenge.participants.sort((a, b) => b.totalProgress - a.totalProgress)[0].totalProgress) * 100}%`,
                                  backgroundColor: participant.isCurrentUser ? '#FF6B00' : '#4DA8DA'
                                }
                              ]} 
                            />
                          </View>
                          
                          <View style={styles.modalParticipantStats}>
                            <Text style={styles.modalParticipantStatsValue}>
                              {participant.totalProgress.toFixed(1)} {selectedChallenge.targetUnit}
                            </Text>
                            {selectedChallenge.type === CHALLENGE_TYPES.DAILY_TARGET && (
                              <Text style={styles.modalParticipantStatsLabel}>
                                {participant.completedDays}/{selectedChallenge.currentDay} days
                              </Text>
                            )}
                          </View>
                        </View>
                        
                        <View style={styles.modalParticipantAction}>
                          <ArrowRight size={20} color="#A0A0A0" />
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </ScrollView>
            )}

            {/* Participant Details View */}
            {selectedChallenge && showParticipantDetails && selectedParticipant && (
              <View style={styles.participantDetailsContainer}>
                {/* Participant Details Header */}
                <View style={styles.participantDetailsHeader}>
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={handleBackToLeaderboard}
                  >
                    <ChevronLeft size={24} color="#FFFFFF" />
                    <Text style={styles.backButtonText}>Leaderboard</Text>
                  </TouchableOpacity>
                </View>

                {/* Participant Profile */}
                <View style={styles.participantProfile}>
                  <Image source={{ uri: selectedParticipant.avatar }} style={styles.participantProfileAvatar} />
                  <Text style={styles.participantProfileName}>
                    {selectedParticipant.name} {selectedParticipant.isCurrentUser && '(You)'}
                  </Text>
                  
                  <View style={styles.participantRankBadge}>
                    <Trophy size={14} color="#FFFFFF" />
                    <Text style={styles.participantRankText}>
                      Rank #{selectedChallenge.participants
                        .sort((a, b) => b.totalProgress - a.totalProgress)
                        .findIndex(p => p.id === selectedParticipant.id) + 1}
                    </Text>
                  </View>
                </View>

                {/* Participant Stats */}
                <View style={styles.participantStatsContainer}>
                  <View style={styles.participantStatItem}>
                    <Text style={styles.participantStatLabel}>Total Progress</Text>
                    <Text style={styles.participantStatValue}>
                      {selectedParticipant.totalProgress.toFixed(1)} {selectedChallenge.targetUnit}
                    </Text>
                  </View>
                  
                  {selectedChallenge.type === CHALLENGE_TYPES.DAILY_TARGET && (
                    <>
                      <View style={styles.participantStatItem}>
                        <Text style={styles.participantStatLabel}>Completed Days</Text>
                        <Text style={styles.participantStatValue}>
                          {selectedParticipant.completedDays}/{selectedChallenge.currentDay}
                        </Text>
                      </View>
                      
                      <View style={styles.participantStatItem}>
                        <Text style={styles.participantStatLabel}>Current Streak</Text>
                        <Text style={styles.participantStatValue}>
                          {selectedParticipant.streakDays} days
                        </Text>
                      </View>
                    </>
                  )}
                  
                  <View style={styles.participantStatItem}>
                    <Text style={styles.participantStatLabel}>Daily Average</Text>
                    <Text style={styles.participantStatValue}>
                      {(selectedParticipant.totalProgress / 
                        (selectedChallenge.type === CHALLENGE_TYPES.DAILY_TARGET ? 
                          selectedChallenge.currentDay : 
                          selectedParticipant.dailyProgress.length)
                      ).toFixed(1)} {selectedChallenge.targetUnit}
                    </Text>
                  </View>
                </View>

                {/* Daily Progress */}
                <View style={styles.dailyProgressSection}>
                  <Text style={styles.dailyProgressTitle}>Daily Progress</Text>
                  
                  <ScrollView style={styles.dailyProgressList}>
                    {selectedParticipant.dailyProgress.map((progress, index) => {
                      const day = index + 1;
                      const isCompleted = selectedChallenge.type === CHALLENGE_TYPES.DAILY_TARGET 
                        ? progress >= selectedChallenge.targetValue 
                        : true;
                      
                      const progressPercentage = selectedChallenge.type === CHALLENGE_TYPES.DAILY_TARGET
                        ? Math.min((progress / selectedChallenge.targetValue) * 100, 100)
                        : (progress / Math.max(...selectedParticipant.dailyProgress)) * 100;
                      
                      return (
                        <View key={index} style={styles.dailyProgressItem}>
                          <Text style={styles.dailyProgressDay}>Day {day}</Text>
                          <View style={styles.dailyProgressBarContainer}>
                            <View 
                              style={[
                                styles.dailyProgressBar,
                                { width: `${progressPercentage}%` },
                                isCompleted ? styles.completedProgressBar : styles.incompleteProgressBar
                              ]}
                            />
                          </View>
                          <Text style={styles.dailyProgressValue}>{progress.toFixed(1)}</Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* Pagination Controls */}
                <View style={styles.paginationControls}>
                  <TouchableOpacity 
                    style={styles.paginationButton}
                    onPress={prevParticipant}
                  >
                    <ChevronLeft size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  
                  <Text style={styles.paginationText}>
                    {currentPage + 1}/{selectedChallenge.participants.length}
                  </Text>
                  
                  <TouchableOpacity 
                    style={styles.paginationButton}
                    onPress={nextParticipant}
                  >
                    <ChevronRight size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedCategoryButton: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#A0A0A0',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeTabText: {
    color: '#FF6B00',
  },
  featuredContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featuredChallenge: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  featuredTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#E0E0E0',
    marginLeft: 6,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4DA8DA',
    borderRadius: 2,
  },
  challengesList: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#A0A0A0',
    letterSpacing: 1,
  },
  sectionAction: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4DA8DA',
    letterSpacing: 0.5,
  },
  challengeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  challengeImageContainer: {
    height: 120,
    position: 'relative',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeCategory: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  challengeCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  challengeContent: {
    padding: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  challengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  potContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  potAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FF6B00',
    marginLeft: 4,
  },
  challengeMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginLeft: 6,
  },
  challengeProgressContainer: {
    marginBottom: 16,
  },
  challengeProgressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  progressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#4DA8DA',
  },
  challengeProgressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  challengeProgressBar: {
    height: '100%',
    backgroundColor: '#4DA8DA',
    borderRadius: 2,
  },
  participantsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  moreParticipants: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#1E1E1E',
  },
  moreParticipantsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewDetailsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4DA8DA',
    marginRight: 4,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    backgroundColor: '#121212',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A1128',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContent: {
    padding: 20,
  },
  modalChallengeInfo: {
    marginBottom: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  modalProgressContainer: {
    marginTop: 8,
  },
  modalProgressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalProgressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  modalProgressPercentage: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4DA8DA',
  },
  modalProgressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  modalProgressBar: {
    height: 6,
    backgroundColor: '#4DA8DA',
    borderRadius: 3,
  },
  modalDescriptionContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalDescriptionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalDescriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 22,
  },
  modalLeaderboardContainer: {
    marginBottom: 20,
  },
  modalLeaderboardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalParticipantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalCurrentUserItem: {
    borderColor: '#FF6B00',
    backgroundColor: 'rgba(255, 107, 0, 0.05)',
  },
  modalParticipantRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  modalFirstPlaceBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRankText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalParticipantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  modalParticipantInfo: {
    flex: 1,
  },
  modalParticipantName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalParticipantProgressContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  modalParticipantProgressBar: {
    height: 6,
    backgroundColor: '#4DA8DA',
    borderRadius: 3,
  },
  modalParticipantStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalParticipantStatsValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  modalParticipantStatsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  modalParticipantAction: {
    marginLeft: 8,
  },
  
  // Participant Details View Styles
  participantDetailsContainer: {
    padding: 20,
  },
  participantDetailsHeader: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  participantProfile: {
    alignItems: 'center',
    marginBottom: 24,
  },
  participantProfileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FF6B00',
  },
  participantProfileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  participantRankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  participantRankText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  participantStatsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  participantStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  participantStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  participantStatValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  dailyProgressSection: {
    marginBottom: 24,
  },
  dailyProgressTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  dailyProgressList: {
    maxHeight: 200,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  dailyProgressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dailyProgressDay: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    width: 50,
  },
  dailyProgressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  dailyProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  completedProgressBar: {
    backgroundColor: '#4DA8DA',
  },
  incompleteProgressBar: {
    backgroundColor: '#A0A0A0',
  },
  dailyProgressValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    width: 40,
    textAlign: 'right',
  },
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  paginationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
});