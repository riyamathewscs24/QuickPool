import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useStore } from '../../store/useStore';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={theme.colors.surface} />
          </View>
          <Text style={styles.name}>{user?.name || 'User'}</Text>
          <Text style={styles.college}>BMS College of Engineering</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="card-outline" size={20} color={theme.colors.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>USN</Text>
              <Text style={styles.detailValue}>{user?.usn || '1BM21CS000'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Phone Number</Text>
              <Text style={styles.detailValue}>{user?.phone || '+91 XXXXX XXXXX'}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>College Email</Text>
              <Text style={styles.detailValue}>{user?.email || 'user@bmsce.ac.in'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
            <Text style={styles.menuText}>Settings</Text>
          </View>
        </View>

        <Button 
          title="Logout" 
          onPress={logout} 
          type="secondary"
          style={styles.logoutButton}
        />
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
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    marginBottom: theme.spacing.m,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.m,
  },
  name: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  college: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  detailsContainer: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  detailTextContainer: {
    marginLeft: theme.spacing.m,
  },
  detailLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
  detailValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginTop: 2,
  },
  menu: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  menuText: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
  },
  logoutButton: {
    marginHorizontal: theme.spacing.m,
  }
});
