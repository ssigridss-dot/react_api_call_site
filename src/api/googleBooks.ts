import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { q: query },
    });

    return response.data.items || [];
  } catch (error: any) {
    console.error("API error:", error.response?.status);

    if (error.response?.status === 429) {
      throw new Error("Liiga palju päringuid (API limit). Proovi uuesti mõne sekundi pärast.");
    }

    throw new Error("API viga");
  }
};

export const getBookById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};