import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { fetchBooks } from '../graphql/queries'; 
import AuthorDetailsModal from './Authordetails';

const AuthorsScreen: React.FC = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<any | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchBooks();
        console.log(response, "ruirui");
        const booksData = response.books;
        const uniqueAuthors = Array.from(new Set(booksData.map((book: { author: any; }) => book.author)))
          .map(author => booksData.find((book: { author: unknown; }) => book.author === author));
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    loadBooks();
  }, []);

  const handleAuthorPress = (author: any) => {
    setSelectedAuthor(author);
    setModalVisible(true);
  };

  const renderAuthorItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleAuthorPress(item)}>
      <View style={styles.authorItem}>
        <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
        <View>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={authors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAuthorItem}
          contentContainerStyle={styles.authorList}
        />

        <AuthorDetailsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          authorDetails={selectedAuthor} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
  },
  authorList: {
    paddingBottom: 100,
  },
  authorItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  authorImage: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthorsScreen;
