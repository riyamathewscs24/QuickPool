import React, { useRef } from 'react';
import { StyleSheet, Text, Pressable, Animated } from 'react-native';
import { theme } from '../theme/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({ title, onPress, type = 'primary', style, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const isPrimary = type === 'primary';
  const backgroundColor = isPrimary ? theme.colors.primary : 'transparent';
  const textColor = isPrimary ? theme.colors.surface : theme.colors.primary;
  const borderColor = isPrimary ? 'transparent' : theme.colors.primary;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor, borderColor },
        disabled && styles.disabled,
        { transform: [{ scale }] },
        style
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    ...theme.typography.h3,
  },
  disabled: {
    opacity: 0.6,
  }
});
