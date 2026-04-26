import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useStore } from '../../store/useStore';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';

export default function LoginScreen({ navigation }) {
  const login = useStore((state) => state.login);
  const [name, setName] = useState('');
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

  const handleLogin = () => {
    setErrorMsg('');
    if (!name || !usn || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    // Assume correct credentials for mock
    login({ name, usn });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>QuickPool</Text>
          <Text style={styles.subtitle}>Coordinate shared trips easily.</Text>
        </View>

        <View style={styles.form}>
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
          <Input 
            label="Your Name" 
            placeholder="e.g. Rahul Sharma" 
            value={name}
            onChangeText={setName}
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
            placeholder="Enter password" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} style={styles.button} />
          
          <Button 
            title="Create an account" 
            type="secondary" 
            onPress={() => navigation.navigate('Signup')} 
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
