import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../api/googleBooks";
import { Button, Container, Typography, Box } from "@mui/material";
import type { Book } from "../types/Book";
import { getFavorites, saveFavorites } from "../utils/localStorage";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) getBookById(id).then(setBook);
  }, [id]);

  const addFavorite = () => {
    const favs = getFavorites();
    saveFavorites([...favs, book]);
  };

  if (!book) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate(-1)}
      >
        ← Back
      </Button>

      <Box
        sx={{
          mt: 2,
          p: 3,
          background: "#1e293b",
          borderRadius: 3,
          display: "flex",
          gap: 4,
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4">
            {book.volumeInfo.title}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Author: {book.volumeInfo.authors?.[0]}
          </Typography>

          <Box
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{
              __html:
                book.volumeInfo.description ||
                "No description available.",
            }}
          />

          <Button sx={{ mt: 3 }} onClick={addFavorite}>
            ⭐ Add to favorites
          </Button>
        </Box>

        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          style={{ height: 300 }}
        />
      </Box>
    </Container>
  );
}