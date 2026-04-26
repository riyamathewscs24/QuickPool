import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { useStore } from '../../store/useStore';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const FROM_LOCATIONS = ['BMSCE Gate 1', 'BMSCE Gate 2', 'BMSCE Boys Hostel', 'BMSCE Girls Hostel', 'Bull Temple Road'];
const DROP_LOCATIONS = ['Majestic Metro', 'Koramangala', 'Indiranagar', 'KSR Railway Station', 'Airport', 'Jayanagar 4th Block', 'National College Metro'];
const GENDERS = ['Any', 'Male Only', 'Female Only'];

export default function CreateTripScreen({ navigation }) {
  const addTrip = useStore((state) => state.addTrip);
  const user = useStore((state) => state.user);

  const [from, setFrom] = useState('');
  const [drop, setDrop] = useState('');
  const [genderPreference, setGenderPreference] = useState('Any');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');
  
  // Dropdown states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showDropDropdown, setShowDropDropdown] = useState(false);

  const handleCreate = () => {
    if (from && drop) {
      addTrip({
        from,
        drop,
        creator: user.name,
        departureTime: date.toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        genderPreference,
        price: '₹50' // Default mock price
      });
      navigation.goBack();
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const openPicker = (mode) => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  // Custom Dropdown Modal Component
  const DropdownModal = ({ visible, data, onSelect, onClose, title }) => (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList 
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable style={styles.dropdownItem} onPress={() => { onSelect(item); onClose(); }}>
                <Text style={styles.dropdownItemText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.sectionLabel}>Pickup Location</Text>
          <Pressable style={styles.dropdownSelector} onPress={() => setShowFromDropdown(true)}>
            <Text style={[styles.selectorText, !from && styles.placeholderText]}>{from || 'Select Pickup Location'}</Text>
            <Ionicons name="chevron-down" size={20} color={theme.colors.textMuted} />
          </Pressable>

          <Text style={styles.sectionLabel}>Drop Location</Text>
          <Pressable style={styles.dropdownSelector} onPress={() => setShowDropDropdown(true)}>
            <Text style={[styles.selectorText, !drop && styles.placeholderText]}>{drop || 'Select Drop Location'}</Text>
            <Ionicons name="chevron-down" size={20} color={theme.colors.textMuted} />
          </Pressable>

          <Text style={styles.sectionLabel}>Departure Date & Time</Text>
          <View style={styles.dateTimeRow}>
            <Pressable style={[styles.dropdownSelector, { flex: 1, marginRight: theme.spacing.s }]} onPress={() => openPicker('date')}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.selectorText}>{date.toLocaleDateString()}</Text>
            </Pressable>
            <Pressable style={[styles.dropdownSelector, { flex: 1, marginLeft: theme.spacing.s }]} onPress={() => openPicker('time')}>
              <Ionicons name="time-outline" size={20} color={theme.colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.selectorText}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Pressable>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={pickerMode}
              is24Hour={false}
              display="default"
              onChange={onDateChange}
              themeVariant="dark" // Forces dark mode for iOS picker
            />
          )}

          <Text style={styles.sectionLabel}>Gender Preference</Text>
          <View style={styles.radioGroup}>
            {GENDERS.map((gender) => (
              <Pressable 
                key={gender} 
                style={styles.radioContainer} 
                onPress={() => setGenderPreference(gender)}
              >
                <View style={[styles.outerCircle, genderPreference === gender && styles.outerCircleSelected]}>
                  {genderPreference === gender && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>{gender}</Text>
              </Pressable>
            ))}
          </View>
          
          <Button title="Offer Ride (Auto)" onPress={handleCreate} style={styles.button} />
        </ScrollView>
      </KeyboardAvoidingView>

      <DropdownModal 
        visible={showFromDropdown} 
        data={FROM_LOCATIONS} 
        title="Select Pickup Location"
        onSelect={setFrom} 
        onClose={() => setShowFromDropdown(false)} 
      />
      <DropdownModal 
        visible={showDropDropdown} 
        data={DROP_LOCATIONS} 
        title="Select Drop Location"
        onSelect={setDrop} 
        onClose={() => setShowDropDropdown(false)} 
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  sectionLabel: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.m,
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectorText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  placeholderText: {
    color: theme.colors.textMuted,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  outerCircleSelected: {
    borderColor: theme.colors.primary,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  radioText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  button: {
    marginTop: theme.spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.m,
    maxHeight: '60%',
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
  dropdownItem: {
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
  }
});
