const API_BASE_URL = 'https://book-app.hasura.app/api/rest';
const HASURA_ADMIN_SECRET = 'InOG2AbdHsfzrKpTv0ljUEAWnwMWp1L86065yfu8B6H2soNeHdHjQo6bX0mmF0wx';  

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,  
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

export const addBook = async (book: { name: string; author: string; coverImage: string; description: string; }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify(book),
    });

    const addedBook = await response.json();
    return addedBook;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};
