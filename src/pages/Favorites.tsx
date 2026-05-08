import { useEffect, useState } from "react";
import { Container, Typography, Button, Box, } from "@mui/material";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    setBooks(getFavorites());
  }, []);

  const remove = (id: string) => {
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    saveFavorites(updated);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>
      <Typography variant="h4">⭐ Favorites</Typography>

      {books.map((book) => (
        <Box
          key={book.id}
          sx={{
            mt: 2,
            p: 2,
            background: "#1e293b",
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography>{book.volumeInfo.title}</Typography>
            <Typography variant="body2">
              {book.volumeInfo.authors?.[0]}
            </Typography>

            <Button onClick={() => remove(book.id)}>
              ❌ Remove
            </Button>
          </div>

          <img
            src={book.volumeInfo.imageLinks?.thumbnail}
            style={{ height: 120 }}
          />
        </Box>
      ))}
    </Container>
  );
}