import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./Home";
import { Utils } from "alchemy-sdk";
import {
  Badge,
  Box,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "./Header";

const Address = () => {
  const { id } = useParams();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const balance = await alchemy.core.getBalance(id, "latest");
      setBalance(Utils.formatEther(balance));
    };
    getBalance();
  }, [id]);

  return (
    <Box color="white" height={window.innerHeight}>
      <Header />
      {!balance ? (
        <Box
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
          display="flex"
        >
          <CircularProgress color="primary" size="55px" />
          <Typography fontSize="17px">
            Fetching data from Ethereum...
          </Typography>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingTop="1rem"
        >
          <Typography
            placement="top"
            fontSize="20px"
            fontWeight="bold"
            color="white"
            marginTop="1rem"
            display="flex"
            textAlign="center"
          >
            Address
          </Typography>
          <Container
            sx={{
              overflowY: "auto",
              maxHeight: "630px",
            }}
          >
            <Table variant="simple" size="medium">
              <TableBody
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        width: "50vw",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography color="white">Address:</Typography>
                      <Typography color="white">{id}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "50vw",
                      }}
                    >
                      <Typography color="white">Balance:</Typography>
                      <Badge
                        sx={{
                          textAlign: "start",
                          backgroundColor: "white",
                          display: "flex",
                          borderRadius: "2px",
                          padding: "2px",
                        }}
                      >
                        {balance.slice(0, 6)} ETH
                      </Badge>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Address;
