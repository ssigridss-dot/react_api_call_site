import { useEffect, useState } from "react";
import { Container, Typography, Button, Box, } from "@mui/material";
import { getFavorites, saveFavorites } from "../utils/localStorage";
import { useNavigate, Link } from "react-router-dom";

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

            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <Button
                component={Link}
                to={`/book/${book.id}`}
                size="small"
              >
                Details
              </Button>

              <Button
                onClick={() => remove(book.id)}
                size="small"
                sx={{
                  color: "#ef4444",
                }}
              >
                Remove
              </Button>
            </Box>
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