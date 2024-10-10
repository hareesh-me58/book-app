import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface AuthorDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    authorDetails: {
      author: string;
      authorImage: string;
      name: string;
      books: string[];
    } | null; 
  }

const AuthorDetailsModal: React.FC<AuthorDetailsModalProps> = ({ visible, onClose, authorDetails }) => {
  if (!authorDetails) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: authorDetails.authorImage }} style={styles.authorImage} />
          <Text style={styles.authorName}>{authorDetails.author}</Text>
          <Text style={styles.bookTitle}>{authorDetails.name}</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  authorImage: {
    width: 100,
    height: 150,
    marginBottom: 15,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  booksList: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f1c40f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AuthorDetailsModal;
