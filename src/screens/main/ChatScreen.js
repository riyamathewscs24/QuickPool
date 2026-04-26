import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, KeyboardAvoidingView, Platform, TextInput, Pressable } from 'react-native';
import { useStore } from '../../store/useStore';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ route }) {
  const { tripId, tripTitle } = route.params;
  const user = useStore((state) => state.user);
  
  // Local state for chat messages (mocking a backend)
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey guys, let me know when you reach the gate!', sender: 'Rahul Sharma', time: '10:00 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: user.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sender === user.name;
    return (
      <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.theirMessage]}>
        {!isMe && <Text style={styles.senderName}>{item.sender}</Text>}
        <Text style={[styles.messageText, isMe && styles.myMessageText]}>{item.text}</Text>
        <Text style={[styles.timeText, isMe && styles.myTimeText]}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{tripTitle} Chat</Text>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContainer}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={theme.colors.textMuted}
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color={theme.colors.surface} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  listContainer: {
    padding: theme.spacing.m,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 0,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  senderName: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  messageText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  myMessageText: {
    color: theme.colors.surface,
  },
  timeText: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
    marginTop: 4,
    alignSelf: 'flex-end',
    fontSize: 10,
  },
  myTimeText: {
    color: theme.colors.surface + 'CC',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    marginRight: theme.spacing.m,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
