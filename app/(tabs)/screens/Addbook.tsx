import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Book {
  id: string;
  name: string;
  author: string;
  coverImage: string;
  description: string;
}

interface AddBookProps {
  onAdd: (bookAdd: Book) => void; 
}

const AddBook: React.FC<AddBookProps> = ({ onAdd }) => {
  const [bookName, setBookName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [description , setdescription] = useState<string>('')

  const handleAddBook = () => {
    const bookAdd: Book = {
      id: String(Date.now()), 
      name: bookName,
      author: authorName,
      coverImage: coverImage,
      description: description,
    };

    onAdd(bookAdd); 
    setBookName('');
    setAuthorName('');
    setCoverImage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Book Name"
        value={bookName}
        onChangeText={setBookName}
        style={styles.input}
      />
      <TextInput
        placeholder="Author Name"
        value={authorName}
        onChangeText={setAuthorName}
        style={styles.input}
      />
      <TextInput
        placeholder="Cover Image URL"
        value={coverImage}
        onChangeText={setCoverImage}
        style={styles.input}
      />
      <Button title="Add Book" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    padding: 10,
  },
});

export default AddBook;
