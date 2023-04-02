import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box width="100%" textAlign="center">
      <Link to={`/`}>
        <h1>Ethereum Mainnet</h1>
      </Link>
      <Box marginTop="1rem" borderBottom="1px solid white" />
    </Box>
  );
};

export default Header;
