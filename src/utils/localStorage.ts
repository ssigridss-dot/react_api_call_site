const KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
};

export const saveFavorites = (books: any[]) => {
  localStorage.setItem(KEY, JSON.stringify(books));
};