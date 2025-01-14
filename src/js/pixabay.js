const ADDRES_API = 'https://pixabay.com/api/';
const KEY_API = '42699555-a78da0bc423c0d9818d6fae0b';

export function creatingRequestPhoto(quest) {
  const parameters = new URLSearchParams({
    key: KEY_API,
    q: quest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  console.dir(parameters);

  return fetch(`${ADDRES_API}?${parameters}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
