import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, StatusBar, Platform, SafeAreaView, Dimensions, Image } from 'react-native';
import { Calendar, DollarSign, Clock, Target, Users, ChevronDown, Plus, X, Check, Camera, ArrowLeft, ChevronRight, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Challenge types
const CHALLENGE_TYPES = [
  { id: 'running', name: 'Running', icon: Target, color: '#FF6B00' },
  { id: 'screen_time', name: 'Screen Time', icon: Clock, color: '#4DA8DA' },
  { id: 'meditation', name: 'Meditation', icon: Calendar, color: '#4CAF50' },
  { id: 'reading', name: 'Reading', icon: Calendar, color: '#9C27B0' },
  { id: 'custom', name: 'Custom', icon: Plus, color: '#FFC107' }
];

// Duration options
const DURATION_OPTIONS = [
  { id: '7', name: '7 days', value: 7 },
  { id: '14', name: '14 days', value: 14 },
  { id: '30', name: '30 days', value: 30 },
  { id: '60', name: '60 days', value: 60 },
  { id: '90', name: '90 days', value: 90 }
];

// Contribution options
const CONTRIBUTION_OPTIONS = [
  { id: '10', name: '$10', value: 10 },
  { id: '25', name: '$25', value: 25 },
  { id: '50', name: '$50', value: 50 },
  { id: '100', name: '$100', value: 100 },
  { id: 'custom', name: 'Custom', value: null }
];

// Friend suggestions
const FRIEND_SUGGESTIONS = [
  { id: '1', name: 'Emily Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop', selected: false },
  { id: '2', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop', selected: false },
  { id: '3', name: 'Jessica Taylor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3387&auto=format&fit=crop', selected: true },
  { id: '4', name: 'James Rodriguez', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=3387&auto=format&fit=crop', selected: true },
  { id: '5', name: 'Sophia Martinez', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=3387&auto=format&fit=crop', selected: false }
];

export default function CreateChallengeScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState(CHALLENGE_TYPES[0]);
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[2]);
  const [selectedContribution, setSelectedContribution] = useState(CONTRIBUTION_OPTIONS[2]);
  const [customContribution, setCustomContribution] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [friends, setFriends] = useState(FRIEND_SUGGESTIONS);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showDurationSelector, setShowDurationSelector] = useState(false);
  const [showContributionSelector, setShowContributionSelector] = useState(false);

  const selectedFriendsCount = friends.filter(friend => friend.selected).length;
  
  const totalPotAmount = () => {
    const contribution = selectedContribution.id === 'custom' 
      ? parseInt(customContribution || '0') 
      : selectedContribution.value;
    return contribution * (selectedFriendsCount + 1); // +1 for the user
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleFriendSelection = (id) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, selected: !friend.selected } : friend
    ));
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map(step => (
        <View 
          key={step} 
          style={[
            styles.stepDot, 
            currentStep === step && styles.activeStepDot,
            currentStep > step && styles.completedStepDot
          ]}
        >
          {currentStep > step && (
            <Check size={12} color="#FFFFFF" />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Challenge Details</Text>
      <Text style={styles.stepDescription}>Set up the basic information for your challenge</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Challenge Title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="e.g., Morning Run Challenge"
            placeholderTextColor="#808080"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your challenge..."
            placeholderTextColor="#808080"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Challenge Type</Text>
        <TouchableOpacity 
          style={styles.selectorButton}
          onPress={() => setShowTypeSelector(!showTypeSelector)}
        >
          <View style={[styles.typeIcon, { backgroundColor: `${selectedType.color}20` }]}>
            {selectedType.icon && <selectedType.icon size={20} color={selectedType.color} />}
          </View>
          <Text style={styles.selectorButtonText}>{selectedType.name}</Text>
          <ChevronDown size={20} color="#A0A0A0" />
        </TouchableOpacity>

        {showTypeSelector && (
          <View style={styles.selectorDropdown}>
            {CHALLENGE_TYPES.map(type => (
              <TouchableOpacity 
                key={type.id}
                style={[
                  styles.selectorOption,
                  selectedType.id === type.id && styles.selectedOption
                ]}
                onPress={() => {
                  setSelectedType(type);
                  setShowTypeSelector(false);
                }}
              >
                <View style={[styles.typeIcon, { backgroundColor: `${type.color}20` }]}>
                  {type.icon && <type.icon size={20} color={type.color} />}
                </View>
                <Text style={[
                  styles.selectorOptionText,
                  selectedType.id === type.id && styles.selectedOptionText
                ]}>
                  {type.name}
                </Text>
                {selectedType.id === type.id && (
                  <Check size={20} color="#FF6B00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={nextStep}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Challenge Settings</Text>
      <Text style={styles.stepDescription}>Configure the duration and contribution</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration</Text>
        <TouchableOpacity 
          style={styles.selectorButton}
          onPress={() => setShowDurationSelector(!showDurationSelector)}
        >
          <Calendar size={20} color="#4DA8DA" style={styles.selectorIcon} />
          <Text style={styles.selectorButtonText}>{selectedDuration.name}</Text>
          <ChevronDown size={20} color="#A0A0A0" />
        </TouchableOpacity>

        {showDurationSelector && (
          <View style={styles.selectorDropdown}>
            {DURATION_OPTIONS.map(duration => (
              <TouchableOpacity 
                key={duration.id}
                style={[
                  styles.selectorOption,
                  selectedDuration.id === duration.id && styles.selectedOption
                ]}
                onPress={() => {
                  setSelectedDuration(duration);
                  setShowDurationSelector(false);
                }}
              >
                <Text style={[
                  styles.selectorOptionText,
                  selectedDuration.id === duration.id && styles.selectedOptionText
                ]}>
                  {duration.name}
                </Text>
                {selectedDuration.id === duration.id && (
                  <Check size={20} color="#FF6B00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Contribution</Text>
        <TouchableOpacity 
          style={styles.selectorButton}
          onPress={() => setShowContributionSelector(!showContributionSelector)}
        >
          <DollarSign size={20} color="#4CAF50" style={styles.selectorIcon} />
          <Text style={styles.selectorButtonText}>
            {selectedContribution.id === 'custom' ? 
              customContribution ? `$${customContribution}` : 'Custom Amount' : 
              selectedContribution.name}
          </Text>
          <ChevronDown size={20} color="#A0A0A0" />
        </TouchableOpacity>

        {showContributionSelector && (
          <View style={styles.selectorDropdown}>
            {CONTRIBUTION_OPTIONS.map(contribution => (
              <TouchableOpacity 
                key={contribution.id}
                style={[
                  styles.selectorOption,
                  selectedContribution.id === contribution.id && styles.selectedOption
                ]}
                onPress={() => {
                  setSelectedContribution(contribution);
                  setShowContributionSelector(false);
                }}
              >
                <Text style={[
                  styles.selectorOptionText,
                  selectedContribution.id === contribution.id && styles.selectedOptionText
                ]}>
                  {contribution.name}
                </Text>
                {selectedContribution.id === contribution.id && (
                  <Check size={20} color="#FF6B00" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedContribution.id === 'custom' && (
          <View style={styles.customAmountContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.customAmountInput}
              placeholder="Enter amount"
              placeholderTextColor="#808080"
              keyboardType="numeric"
              value={customContribution}
              onChangeText={setCustomContribution}
            />
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Make Challenge Public</Text>
          <Switch
            trackColor={{ false: '#333333', true: '#FF6B0050' }}
            thumbColor={isPublic ? '#FF6B00' : '#A0A0A0'}
            ios_backgroundColor="#333333"
            onValueChange={() => setIsPublic(!isPublic)}
            value={isPublic}
          />
        </View>
        <Text style={styles.toggleDescription}>
          Public challenges can be discovered by other users
        </Text>
      </View>

      <View style={styles.potSummary}>
        <Text style={styles.potSummaryLabel}>Estimated Pot Amount:</Text>
        <Text style={styles.potSummaryAmount}>${totalPotAmount()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={prevStep}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={nextStep}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Invite Friends</Text>
      <Text style={styles.stepDescription}>Select friends to join your challenge</Text>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends"
            placeholderTextColor="#808080"
          />
        </View>
      </View>

      <View style={styles.friendsList}>
        {friends.map(friend => (
          <TouchableOpacity 
            key={friend.id}
            style={[
              styles.friendItem,
              friend.selected && styles.selectedFriendItem
            ]}
            onPress={() => toggleFriendSelection(friend.id)}
          >
            <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
            <Text style={styles.friendName}>{friend.name}</Text>
            <View style={[
              styles.friendCheckbox,
              friend.selected && styles.selectedFriendCheckbox
            ]}>
              {friend.selected && <Check size={16} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Challenge Summary</Text>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Title:</Text>
          <Text style={styles.summaryValue}>{title || 'Not specified'}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Type:</Text>
          <Text style={styles.summaryValue}>{selectedType.name}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Duration:</Text>
          <Text style={styles.summaryValue}>{selectedDuration.name}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Your Contribution:</Text>
          <Text style={styles.summaryValue}>
            {selectedContribution.id === 'custom' ? 
              customContribution ? `$${customContribution}` : 'Not specified' : 
              selectedContribution.name}
          </Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Participants:</Text>
          <Text style={styles.summaryValue}>{selectedFriendsCount + 1} people</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Pot:</Text>
          <Text style={styles.summaryValue}>${totalPotAmount()}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={prevStep}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Challenge</Text>
          <View style={{ width: 40 }} />
        </View>
        
        {renderStepIndicator()}
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeStepDot: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  completedStepDot: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textAreaContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 120,
  },
  textArea: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlignVertical: 'top',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    height: 56,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectorIcon: {
    marginRight: 12,
  },
  selectorButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  selectorDropdown: {
    backgroundColor: '#262626',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    marginTop: 8,
    overflow: 'hidden',
  },
  selectorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  selectorOptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  selectedOptionText: {
    color: '#FF6B00',
    fontFamily: 'Inter-Medium',
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    height: 56,
    marginTop: 8,
  },
  dollarSign: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#4CAF50',
    marginRight: 8,
  },
  customAmountInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  potSummary: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  potSummaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  potSummaryAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FF6B00',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  nextButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  nextButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
  },
  searchInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  friendsList: {
    marginBottom: 24,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 12,
    marginBottom: 8,
  },
  selectedFriendItem: {
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    borderColor: '#FF6B00',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  friendName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  friendCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFriendCheckbox: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  summaryContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#A0A0A0',
    width: 140,
  },
  summaryValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
});