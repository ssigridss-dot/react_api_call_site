import { useState } from "react";
import { searchBooks } from "../api/googleBooks";
import BookCard from "../components/BookCard";
import { TextField, Container, CircularProgress, Button, Box, } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Book } from "../types/Book";
import { getFavorites, saveFavorites, } from "../utils/localStorage";

export default function Home() {
  const [query, setQuery] = useState("");

  const [books, setBooks] = useState<Book[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchBooks(query);

      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (book: Book) => {
    const favs = getFavorites();

    const exists = favs.find(
      (b: Book) => b.id === book.id
    );

    if (!exists) {
      saveFavorites([...favs, book]);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* SEARCH AREA */}

      <Box
        sx={{
        display: "flex",
        justifyContent: "left",
        gap: 2,
        mb: 5,
        }}
      >
        <TextField
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          sx={{
            width: {
              xs: "100%",
              md: "950px",
            },

            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1e293b",
              borderRadius: "16px",

              "& fieldset": {
                borderColor: "#334155",
              },

              "&:hover fieldset": {
                borderColor: "#4dabf7",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#4dabf7",
              },
            },

            "& input": {
              color: "white",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            px: 4,
          }}
        >
          Search
        </Button>
      </Box>

      {/* LOADING */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* BOOK GRID */}

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid
            key={book.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <BookCard
              book={book}
              onFavorite={addFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}