import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, StatusBar, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Search, UserPlus, Check, X, MessageCircle, Trophy, Filter, ChevronRight, Users, Bell, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for friends
const FRIENDS = [
  {
    id: '1',
    name: 'Emily Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop',
    status: 'active',
    challenges: 2,
    lastActive: null,
  },
  {
    id: '2',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop',
    status: 'inactive',
    challenges: 0,
    lastActive: '2 days ago',
  },
  {
    id: '3',
    name: 'Jessica Taylor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop',
    status: 'active',
    challenges: 3,
    lastActive: null,
  },
  {
    id: '4',
    name: 'James Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
    status: 'active',
    challenges: 1,
    lastActive: null,
  },
  {
    id: '5',
    name: 'Sophia Martinez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=3387&auto=format&fit=crop',
    status: 'inactive',
    challenges: 0,
    lastActive: '5 days ago',
  },
  {
    id: '6',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop',
    status: 'active',
    challenges: 2,
    lastActive: null,
  },
  {
    id: '7',
    name: 'Sarah Miller',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=3387&auto=format&fit=crop',
    status: 'active',
    challenges: 4,
    lastActive: null,
  }
];

// Mock data for friend requests
const FRIEND_REQUESTS = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop',
    mutualFriends: 4,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop',
    mutualFriends: 2,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop',
    mutualFriends: 1,
  }
];

export default function FriendsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter friends based on search query
  const filteredFriends = FRIENDS.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter based on selected filter
  const getFilteredFriends = () => {
    if (selectedFilter === 'active') {
      return filteredFriends.filter(friend => friend.status === 'active');
    } else if (selectedFilter === 'inactive') {
      return filteredFriends.filter(friend => friend.status === 'inactive');
    }
    return filteredFriends;
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
            <Text style={styles.headerTitle}>FRIENDS</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color="#A0A0A0" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search friends"
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
          
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}
              >
                All Friends
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
              onPress={() => setActiveTab('requests')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}
              >
                Requests
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{FRIEND_REQUESTS.length}</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'all' ? (
            <>
              {/* Friend Filters */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersContainer}
              >
                <TouchableOpacity 
                  style={[styles.filterChip, selectedFilter === 'all' && styles.activeFilterChip]}
                  onPress={() => setSelectedFilter('all')}
                >
                  <Text style={[styles.filterChipText, selectedFilter === 'all' && styles.activeFilterChipText]}>
                    All
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.filterChip, selectedFilter === 'active' && styles.activeFilterChip]}
                  onPress={() => setSelectedFilter('active')}
                >
                  <Text style={[styles.filterChipText, selectedFilter === 'active' && styles.activeFilterChipText]}>
                    Active
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.filterChip, selectedFilter === 'inactive' && styles.activeFilterChip]}
                  onPress={() => setSelectedFilter('inactive')}
                >
                  <Text style={[styles.filterChipText, selectedFilter === 'inactive' && styles.activeFilterChipText]}>
                    Inactive
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              
              {/* Friends List */}
              <View style={styles.friendsList}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>YOUR FRIENDS</Text>
                  <Text style={styles.friendCount}>{getFilteredFriends().length} friends</Text>
                </View>
                
                {getFilteredFriends().map(friend => (
                  <TouchableOpacity key={friend.id} style={styles.friendItem}>
                    <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                    
                    <View style={styles.friendInfo}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <View style={styles.friendStatus}>
                        <View style={[
                          styles.statusDot, 
                          friend.status === 'active' ? styles.statusActive : styles.statusInactive
                        ]} />
                        <Text style={styles.statusText}>
                          {friend.status === 'active' 
                            ? `Currently in ${friend.challenges} challenge${friend.challenges !== 1 ? 's' : ''}` 
                            : `Last active ${friend.lastActive}`}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.friendActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <MessageCircle size={20} color="#4DA8DA" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <Trophy size={20} color="#FF6B00" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity style={styles.addFriendButton}>
                  <Plus size={24} color="#FFFFFF" />
                  <Text style={styles.addFriendText}>Add New Friend</Text>
                </TouchableOpacity>
              </View>
              
              {/* Suggested Friends */}
              <View style={styles.suggestedSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>SUGGESTED FRIENDS</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.suggestedContainer}
                >
                  {FRIEND_REQUESTS.map(request => (
                    <View key={request.id} style={styles.suggestedCard}>
                      <Image source={{ uri: request.avatar }} style={styles.suggestedAvatar} />
                      <Text style={styles.suggestedName}>{request.name}</Text>
                      <Text style={styles.suggestedMutual}>{request.mutualFriends} mutual friends</Text>
                      <TouchableOpacity style={styles.suggestedAddButton}>
                        <Plus size={16} color="#FFFFFF" />
                        <Text style={styles.suggestedAddText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            /* Friend Requests View */
            <View style={styles.requestsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>FRIEND REQUESTS</Text>
                <Text style={styles.requestCount}>{FRIEND_REQUESTS.length} pending</Text>
              </View>
              
              {FRIEND_REQUESTS.map(request => (
                <View key={request.id} style={styles.requestItem}>
                  <Image source={{ uri: request.avatar }} style={styles.requestAvatar} />
                  
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestName}>{request.name}</Text>
                    <Text style={styles.requestMutual}>{request.mutualFriends} mutual friends</Text>
                  </View>
                  
                  <View style={styles.requestActions}>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Check size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineButton}>
                      <X size={20} color="#A0A0A0" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  badge: {
    backgroundColor: '#FF4D4D',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeFilterChip: {
    backgroundColor: 'rgba(77, 168, 218, 0.1)',
    borderColor: '#4DA8DA',
  },
  filterChipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeFilterChipText: {
    color: '#4DA8DA',
  },
  friendsList: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
  friendCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4DA8DA',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 16,
  },
  friendName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  friendStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  friendActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4DA8DA',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },
  addFriendText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  suggestedSection: {
    marginBottom: 30,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#4DA8DA',
  },
  suggestedContainer: {
    paddingHorizontal: 20,
  },
  suggestedCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 160,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  suggestedAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },
  suggestedName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  suggestedMutual: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 12,
  },
  suggestedAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4DA8DA',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  suggestedAddText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  requestsContainer: {
    paddingHorizontal: 20,
  },
  requestCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FF4D4D',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 16,
  },
  requestName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  requestMutual: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  requestActions: {
    flexDirection: 'row',
  },
  acceptButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4DA8DA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  declineButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
});