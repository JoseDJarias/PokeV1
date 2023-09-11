const API_URL = 'https://64fdf931596493f7af7ed14d.mockapi.io/favorites';

// post
async function addFavorite(favorite) {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favorite),
      });
      return response.json();
    } catch (error) {
      console.error('Error adding favorite:', error);
      return null;
    }
  }