import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Dimensions, 
  Platform, 
  KeyboardAvoidingView, 
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Link, router } from 'expo-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Apple, X } from 'lucide-react-native';
import { useAuth } from '@/store/authStore';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  
  const { login, loginWithApple, loginWithGoogle } = useAuth();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    // Check if Apple authentication is available
    AppleAuthentication.isAvailableAsync().then(
      available => setIsAppleAuthAvailable(available)
    );
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'apple' | 'google') => {
    try {
      setIsLoading(true);
      setError(null);
      
      switch (provider) {
        case 'apple':
          await loginWithApple();
          break;
        case 'google':
          await loginWithGoogle();
          break;
      }
      
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error(`${provider} login error:`, err);
      if (err.code === '23505' || (err.message && err.message.includes('duplicate key value'))) {
        // This means the user exists but there was an issue with profile creation
        // We can safely navigate them since authentication succeeded
        router.replace('/(tabs)');
        return;
      }
      if (err.code === 'ERR_REQUEST_CANCELED') {
        // User canceled the sign-in, no need to show error
        return;
      }
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Image 
          source={{ uri: 'https://i.imgur.com/PPVM8Hi.png' }}
          style={styles.backgroundImage}
        />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>Log in to continue your journey</Text>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Mail size={20} color="#A0A0A0" style={styles.inputIcon} />
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#808080"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isLoading}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                  textContentType="emailAddress"
                  autoComplete="email"
                  autoCorrect={false}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Lock size={20} color="#A0A0A0" style={styles.inputIcon} />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#808080"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  textContentType="password"
                  autoComplete="password"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#A0A0A0" />
                  ) : (
                    <Eye size={20} color="#A0A0A0" />
                  )}
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                {Platform.OS === 'ios' && isAppleAuthAvailable && (
                  <TouchableOpacity 
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <View style={styles.socialButtonContent}>
                      <Image 
                        source={{ uri: 'https://i.imgur.com/FQfTXQ8.png' }}
                        style={styles.appleIcon}
                      />
                      <Text style={styles.socialButtonText}>Apple</Text>
                    </View>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={[styles.socialButton, styles.googleButton]}
                  onPress={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <View style={styles.socialButtonContent}>
                    <Image 
                      source={{ uri: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png' }}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.socialButtonText}>Google</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressIndicator, { width: '66%' }]} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
    zIndex: 1,
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
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E0E0E0',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 87, 51, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 87, 51, 0.3)',
    marginHorizontal: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#FF5733',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#333333',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4DA8DA',
  },
  loginButton: {
    backgroundColor: '#4DA8DA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
  },
  socialButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
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
    marginLeft: -2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  signupText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4DA8DA',
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 2,
    marginBottom: 30,
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  googleButton: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
  },
});