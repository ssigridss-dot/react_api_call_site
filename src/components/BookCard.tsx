import { Card, CardContent, Typography, Button, CardMedia, } from "@mui/material";
import { Link } from "react-router-dom";
import type { Book } from "../types/Book";

export default function BookCard({
  book,
  onFavorite,
}: {
  book: Book;
  onFavorite?: (book: Book) => void;
}) {
  const image =
    book.volumeInfo.imageLinks?.thumbnail ||
    "https://via.placeholder.com/128x180";

  return (
    <Card
      sx={{
        width: 220,
        background: "#1e293b",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={image}
      />

      <CardContent>
        <Typography variant="subtitle1">
          {book.volumeInfo.title}
        </Typography>

        <Typography variant="body2">
          {book.volumeInfo.authors?.[0]}
        </Typography>

        <Button
          component={Link}
          to={`/book/${book.id}`}
          size="small"
        >
          Details
        </Button>

        {onFavorite && (
          <Button
            onClick={() => onFavorite(book)}
            size="small"
          >
            ⭐
          </Button>
        )}
      </CardContent>
    </Card>
  );
}