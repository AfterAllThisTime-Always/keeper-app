import React from "react";

import HighlightIcon from '@mui/icons-material/Highlight';

import { Button } from "@mui/material";

function Header({ curUser, signInwithFirebase, signOutwithFirebase }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <h1><HighlightIcon />Keeper</h1>

      {curUser ? null : (<Button variant="contained" onClick={signInwithFirebase}>
        LOGIN
      </Button>)}

      {curUser ? (
        <Button variant="text" onClick={signOutwithFirebase}>
          LOGOUT
        </Button>
      ) : null}
    </header>

  );
}

export default Header;