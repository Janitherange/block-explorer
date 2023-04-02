import { useEffect, useState } from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import {
  Badge,
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";

const settings = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

const Home = () => {
  const [blockNumber, setBlockNumber] = useState();
  const [recentBlocks, setRecentBlocks] = useState();
  const [recentTransactions, setRecentTransaction] = useState();

  useEffect(() => {
    const blockArray = [];
    const transactionArray = [];

    const getRecentBlocks = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
      for (let i = blockNumber; i >= blockNumber - 20; i--) {
        const block = await alchemy.core.getBlock(i);
        blockArray.push(block);
      }
      setRecentBlocks(blockArray);
    };

    const getRecentTransactions = async () => {
      const { transactions } = await alchemy.core.getBlockWithTransactions(
        blockNumber
      );
      for (let i = 0; i <= 10; i++) {
        transactionArray.push(transactions[i]);
      }
      setRecentTransaction(transactionArray);
    };

    getRecentBlocks();
    getRecentTransactions();
  }, []);

  return (
    <Box height={window.innerHeight}>
      <Header/>
      {!recentBlocks || !recentTransactions ? (
        <Box
          justifyItems="center"
          alignItems="center"
          marginTop="15rem"
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <CircularProgress color="primary" size="55px"/>
          <Typography fontSize="17px">
            Fetching data from Ethereum...
          </Typography>
        </Box>
      ) : (
        <Container
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 4,
            marginY: "auto",
          }}
        >
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "630px",
              backgroundColor: "black",
              borderRadius: "20px",
              margin: "2rem 0",
            }}
          >
            <Typography
              fontSize="20px"
              padding="1rem"
              fontWeight="bold"
              textAlign="center"
            >
              Latest Blocks
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "black",
                textAlign: "center",
              }}
            >
              <Table>
                <TableBody>
                  {recentBlocks.map((block, i) => {
                    return (
                      <TableRow
                        key={i}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 3fr 1fr"
                        }}
                      >
                        <TableCell
                          sx={{
                            color: "white",
                            display: "flex",
                          }}
                        >
                          <Typography>Block</Typography>
                          <Typography
                            color="teal"
                            sx={{
                              ":hover": {
                                opacity: 0.9,
                              },
                            }}
                          >
                            <Link to={`/block/${block.number}`}>
                              {block.number}
                            </Link>
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            display: "flex",
                          }}
                        >
                          <Typography marginRight="4px">Fee recipient</Typography>
                          <Typography
                            color="teal"
                            sx={{
                              ":hover": {
                                opacity: 0.9,
                              },
                            }}
                          >
                            <Link to={`/address/${block.miner}`}>
                              {block.miner.slice(0, 16)}...
                            </Link>
                          </Typography>
                        </TableCell>
                        <TableCell
                          
                        >
                          <Badge
                            sx={{
                              backgroundColor: "#FFFFFF",
                              padding: "2px",
                              borderRadius: "2px",
                            }}
                          >
                            {" "}
                            {block.transactions.length} Txs
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "630px",
              margin: "2rem 0",
              backgroundColor: "black",
              borderRadius: "20px",
            }}
          >
            <Typography
              fontSize="20px"
              textAlign="center"
              padding="1rem"
              fontWeight="bold"
            >
              Latest Transactions
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "black",
                textAlign: "center",
              }}
            >
              <TableBody>
                {recentTransactions.map((transaction, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 2fr 1fr"
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "white",
                          display: "flex",
                        }}
                      >
                        <Typography
                          color="teal"
                          sx={{
                            ":hover": {
                              opacity: 0.9,
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Link to={`/transactionHash/${transaction.hash}`}>
                            {transaction.hash.slice(0, 16)}...
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          display: "flex",
                        }}
                      >
                        <Box>
                          <Box sx={{
                            display: "flex",
                          }}>
                            <Typography>From:</Typography>
                            <Typography
                              color="teal"
                              sx={{
                                ":hover": {
                                  opacity: 0.9,
                                },
                              }}
                            >
                              <Link to={`/address/${transaction.from}`}>
                                {transaction.from.slice(0, 16)}...
                              </Link>
                            </Typography>
                          </Box>
                          <br />
                          <Box sx={{
                            display: "flex"
                          }}>
                          <Typography>To:</Typography>
                          <Typography
                            color="teal"
                            sx={{
                              ":hover": {
                                opacity: 0.9,
                              },
                            }}
                          >
                            <Link to={`/address/${transaction.to}`}>
                              {transaction.to.slice(0, 16)}...
                            </Link>
                          </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <Badge
                          sx={{
                            backgroundColor: "#FFFFFF",
                            padding: "2px",
                            borderRadius: "2px",
                            display: "flex",
                          }}
                        >
                          {Utils.formatEther(transaction.value).slice(0, 5)}
                          ETH
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableContainer>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Home;
