import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useStore } from '../../store/useStore';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';

export default function SignupScreen({ navigation }) {
  const signup = useStore((state) => state.signup);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, tension: 50, friction: 7, useNativeDriver: true })
    ]).start();
  }, []);

  const handleSignup = () => {
    setErrorMsg('');
    if (!name || !phone || !email || !usn || !password) {
      setErrorMsg('All fields are required.');
      return;
    }
    if (!email.endsWith('@bmsce.ac.in')) {
      setErrorMsg('Only BMSCE email IDs are allowed.');
      return;
    }
    
    // USN Validation: 10 chars, starts with 1, followed by BF/WA/BM/WN, ends with 3 numbers
    const usnRegex = /^1(BF|WA|BM|WN).{4}\d{3}$/i;
    if (usn.length !== 10 || !usnRegex.test(usn)) {
      setErrorMsg('Invalid USN format. (e.g. 1BM21CS123)');
      return;
    }

    signup({ name, phone, email, usn });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Join QuickPool</Text>
          <Text style={styles.subtitle}>Find travel buddies instantly.</Text>
        </View>

        <View style={styles.form}>
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          <Input 
            label="Full Name" 
            placeholder="e.g. Anjali Gupta" 
            value={name}
            onChangeText={setName}
          />
          <Input 
            label="Phone Number" 
            placeholder="e.g. 9876543210" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Input 
            label="College Email" 
            placeholder="name.branch@bmsce.ac.in" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            label="USN" 
            placeholder="e.g. 1BM21CS123" 
            autoCapitalize="characters"
            value={usn}
            onChangeText={setUsn}
          />
          <Input 
            label="Password" 
            placeholder="Create a password" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign Up" onPress={handleSignup} style={styles.button} />
          
          <Button 
            title="Already have an account? Login" 
            type="secondary" 
            onPress={() => navigation.goBack()} 
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  form: {
    width: '100%',
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.m,
  }
});
