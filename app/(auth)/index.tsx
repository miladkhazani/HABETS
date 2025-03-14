import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Trophy, Users, Target, ChevronRight, Apple } from 'lucide-react-native';
import { useAuth } from '@/store/authStore';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));
  const { loginWithGoogle, loginWithApple } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  const handleAppleLogin = async () => {
    try {
      await loginWithApple();
      if (useAuth.getState().isAuthenticated) {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      if (err.code === 'ERR_REQUEST_CANCELED') {
        return;
      }
      console.error('Apple login error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://i.imgur.com/PPVM8Hi.png' }}
        style={styles.backgroundImage}
      />
      
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://i.imgur.com/2JJIsfd.png' }}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image 
            source={{ uri: 'https://i.imgur.com/6QXseRM.gif' }}
            style={styles.taglineGif}
          />
        </View>
        
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <View style={[styles.gridItem, styles.gridItemActive]}>
              <Trophy size={24} color="#FFFFFF" />
              <Text style={[styles.gridItemText, styles.gridItemActiveText]}>Compete</Text>
            </View>
            <View style={styles.gridItem}>
              <Users size={24} color="#E0E0E0" />
              <Text style={styles.gridItemText}>Connect</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Target size={24} color="#E0E0E0" />
              <Text style={styles.gridItemText}>Achieve</Text>
            </View>
            <View style={styles.gridItem}>
              <Trophy size={24} color="#E0E0E0" />
              <Text style={styles.gridItemText}>Reward</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Link href="/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Continue with Email</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </Link>
          
          <TouchableOpacity 
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleAppleLogin}
          >
            <View style={styles.socialButtonContent}>
              <Image 
                source={{ uri: 'https://i.imgur.com/FQfTXQ8.png' }}
                style={styles.appleIcon}
              />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
          >
            <View style={styles.socialButtonContent}>
              <Image 
                source={{ uri: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png' }}
                style={styles.googleIcon}
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.textButton}>
              <Text style={styles.textButtonText}>Create New Account</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        <Text style={styles.termsText}>
          By continuing you agree to our Terms of Service and Privacy Policy
        </Text>
      </Animated.View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressIndicator} />
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 30,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 0,
  },
  taglineGif: {
    width: 400,
    height: 80,
    marginBottom: 60,
  },
  grid: {
    width: '100%',
    marginBottom: 40,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    width: (width - 64) / 2,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridItemActive: {
    backgroundColor: 'rgba(77, 168, 218, 0.2)',
    borderColor: '#4DA8DA',
  },
  gridItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 8,
  },
  gridItemActiveText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#4DA8DA',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  socialButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
  },
  googleButton: {
    backgroundColor: '#1E1E1E',
  },
  socialButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    flexShrink: 1,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginLeft: -2,
  },
  appleIcon: {
    width: 18,
    height: 22,
    tintColor: '#FFFFFF',
    marginLeft: -10,
  },
  textButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  textButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4DA8DA',
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 20,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressIndicator: {
    width: '33%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});