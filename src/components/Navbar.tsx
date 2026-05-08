import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
      }}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          HOME
        </Button>
        <Button color="inherit" component={Link} to="/favorites">
          FAVORITES
        </Button>
      </Toolbar>
    </AppBar>
  );
}