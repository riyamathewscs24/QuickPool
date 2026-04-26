import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

export default function TripCard({ trip, onPress, index }) {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: index * 100, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay: index * 100, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={onPress}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{trip.from} → {trip.drop}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>{trip.price}</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="time-outline" size={16} color={theme.colors.textMuted} />
          <Text style={styles.detailText}>{trip.departureTime}</Text>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="person-outline" size={16} color={theme.colors.textMuted} />
          <Text style={styles.detailText}>Driver: {trip.creator} • {trip.genderPreference}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.memberAvatars}>
            {trip.members.slice(0, 3).map((_, i) => (
              <View key={i} style={[styles.avatar, { left: -i * 8 }]} />
            ))}
            {trip.members.length > 3 && (
              <View style={[styles.avatar, styles.moreAvatar, { left: -24 }]}>
                <Text style={styles.moreAvatarText}>+{trip.members.length - 3}</Text>
              </View>
            )}
          </View>
          <Text style={styles.spotsText}>
            {trip.members.length}/{trip.maxMembers} Joined
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.s,
    fontSize: 16,
  },
  priceBadge: {
    backgroundColor: theme.colors.accent1,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.round,
  },
  priceText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textMuted,
    marginLeft: theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.m,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  memberAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.secondary,
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  moreAvatar: {
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreAvatarText: {
    fontSize: 10,
    color: theme.colors.textMuted,
    fontWeight: 'bold',
  },
  spotsText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  }
});
