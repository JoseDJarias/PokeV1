const API_URL = 'https://64ff20f8f8b9eeca9e29a776.mockapi.io';

// all favs
async function getAllFavs() {
  const response = await fetch(`${API_URL}/favs`);
  const data = response.json();
  return data
  console.log(data);
}

// by name
async function getPokemonIdByName(name) {
  try {
    const response = await fetch(`${API_URL}/favs?name=${name}`);
    const data = await response.json();
    if (data && data.length > 0) {
      return data[0].id;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

// post
async function addFavorite(name) {
  try {
    const response = await fetch(`${API_URL}/favs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    });
    return response.json();
  } catch (error) {
    console.error('Error adding favorite:', error);
    return null;
  }
}
// delete
async function deleteFavorite(id) {
  try {
    await fetch(`${API_URL}/favs/${id}`, {
      method: 'DELETE',
    });
    console.log(`Favorite with ID ${id} deleted.`);
  } catch (error) {
    console.error(`Error with ID ${id} it couldn't get delete it. ${error}`);
  }
}


export { getPokemonIdByName, addFavorite, deleteFavorite, getAllFavs }