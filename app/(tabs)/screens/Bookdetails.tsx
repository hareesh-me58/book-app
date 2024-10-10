import React from 'react';
import { Modal, View, Text, Image, StyleSheet, Button } from 'react-native';
import { Book } from '../graphql/types'; 

interface BookDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  bookDetails: Book | null;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ visible, onClose, bookDetails }) => {
  if (!bookDetails) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: bookDetails.coverImage }} style={styles.bookImage} />
          <Text style={styles.bookTitle}>{bookDetails.name}</Text>
          <Text style={styles.bookAuthor}>{bookDetails.author}</Text>
          <Text style={styles.bookDescription}>{bookDetails.description}</Text>
          <Button title="Close" onPress={onClose} />
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
  bookImage: {
    width: 100,
    height: 150,
    marginBottom: 15,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default BookDetailsModal;
