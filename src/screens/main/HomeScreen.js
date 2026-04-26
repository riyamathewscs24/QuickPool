import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store/useStore';
import TripCard from '../../components/TripCard';
import { theme } from '../../theme/theme';

export default function HomeScreen({ navigation }) {
  const trips = useStore((state) => state.trips);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const notifications = useStore((state) => state.notifications);

  // Split trips into active/upcoming vs suggestions (mock logic)
  const myRides = trips.filter(t => t.members.includes(user?.name));
  const rideSuggestions = trips.filter(t => !t.members.includes(user?.name));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header & Location */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={20} color={theme.colors.accent2} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationLabel}>Current Location</Text>
                <Text style={styles.locationValue}>BMS College of Engineering</Text>
              </View>
            </View>
            <View style={styles.headerIcons}>
              <Pressable onPress={() => navigation.navigate('Chat', { tripTitle: 'Customer Service' })} style={styles.iconButton}>
                <Ionicons name="headset-outline" size={24} color={theme.colors.text} />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
                {notifications.length > 0 && <View style={styles.badge} />}
              </Pressable>
            </View>
          </View>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={theme.colors.textMuted} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Where to?"
              placeholderTextColor={theme.colors.textMuted}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionCard} onPress={() => {}}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent1 }]}>
              <Ionicons name="search" size={28} color={theme.colors.primary} />
            </View>
            <Text style={styles.actionText}>Find a Ride</Text>
          </Pressable>
          
          <Pressable style={styles.actionCard} onPress={() => navigation.navigate('Create')}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.accent2 }]}>
              <Ionicons name="add-circle" size={28} color={theme.colors.surface} />
            </View>
            <Text style={styles.actionText}>Offer a Ride</Text>
          </Pressable>
          
          <Pressable style={styles.actionCard} onPress={() => {}}>
            <View style={[styles.actionIcon, { backgroundColor: theme.colors.secondary }]}>
              <Ionicons name="calendar" size={28} color={theme.colors.surface} />
            </View>
            <Text style={styles.actionText}>Reserve for Later</Text>
          </Pressable>
        </View>

        {/* Map View Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>BMSCE / Basavanagudi</Text>
          <View style={styles.mapBox}>
            {/* OpenStreetMap Static image via a free service for Basavanagudi area */}
            <Image 
              source={{ uri: 'https://static-maps.yandex.ru/1.x/?lang=en_US&ll=77.5665,12.9410&z=15&l=map&size=400,150' }}
              style={styles.mapImage}
            />
            <View style={styles.mapOverlay}>
              <Ionicons name="location" size={24} color={theme.colors.error} />
            </View>
          </View>
        </View>

        {/* Ride Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ride Suggestions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {rideSuggestions.map((trip, index) => (
              <View key={trip.id} style={{ width: 280, marginRight: theme.spacing.m }}>
                <TripCard 
                  trip={trip} 
                  index={index}
                  onPress={() => navigation.navigate('Chat', { tripId: trip.id, tripTitle: trip.from })} 
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming and Active Rides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Upcoming Rides</Text>
          {myRides.length === 0 ? (
            <Text style={styles.emptyText}>You haven't booked or offered any rides yet.</Text>
          ) : (
            myRides.map((trip, index) => (
              <TripCard 
                key={trip.id}
                trip={trip} 
                index={index}
                onPress={() => navigation.navigate('Chat', { tripId: trip.id, tripTitle: trip.from })} 
              />
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: theme.spacing.m,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: theme.spacing.s,
  },
  locationLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  locationValue: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.s,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.s,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginHorizontal: theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.s,
  },
  actionText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapContainer: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  mapBox: {
    height: 150,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  mapOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  section: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  horizontalScroll: {
    paddingBottom: theme.spacing.s,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.m,
  }
});
