import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity, Modal, Pressable } from 'react-native';
import { fetchBooks, addBook } from '../graphql/queries';

interface Book {
  id: number;
  name: string;
  author: string;
  coverImage: string;
  description: string;
}

const BookScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetchBooks();
      console.log(response, 'books');
      if (response && response.books) {
        setBooks(response.books);
      }
    } catch (error) {
      Alert.alert('Error fetching books:');
    }
  };

  const handleAddBook = async () => {
    if (name && author && coverImage && description) {
      const newBook = {
        name,
        author,
        coverImage,
        description,
      };

      try {
        const addedBook = await addBook(newBook); 
        console.log('Book added successfully:', addedBook);

        setBooks((prevBooks) => [
          ...prevBooks,
          {
            ...newBook,
            id: addedBook.id, 
          },
        ]);

        setName('');
        setAuthor('');
        setCoverImage('');
        setDescription('');
      } catch (error) {
        Alert.alert('Error adding book:');
      }
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)} style={styles.bookItem}>
      <Image source={{ uri: item.coverImage }} style={styles.bookImage} />
      <View>
        <Text style={styles.bookTitle}>{item.name}</Text>
        <Text>{item.author}</Text>
        <Text numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookItem}
        ListHeaderComponent={<Text style={styles.header}>Book List</Text>}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Book Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Cover Image URL"
          value={coverImage}
          onChangeText={setCoverImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Add Book" onPress={handleAddBook} /> 
      </View>

      {selectedBook && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Image source={{ uri: selectedBook.coverImage }} style={styles.modalImage} />
            <Text style={styles.modalTitle}>{selectedBook.name}</Text>
            <Text style={styles.modalAuthor}>{selectedBook.author}</Text>
            <Text style={styles.modalDescription}>{selectedBook.description}</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  modalAuthor: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default BookScreen;
