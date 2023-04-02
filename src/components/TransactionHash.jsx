import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { alchemy } from "./Home";
import { Utils } from "alchemy-sdk";
import {
  Badge,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  Container,
  TableRow,
  Typography,
} from "@mui/material";
import Header from "./Header";

const TransactionHash = () => {
  const { id } = useParams();
  const [recentTransaction, setRecentTransactions] = useState();
  const [block, setBlock] = useState();
  const [value, setValue] = useState();

  useEffect(() => {
    const getTransaction = async () => {
      const recentTransaction = await alchemy.core.getTransactionReceipt(id);
      setRecentTransactions(recentTransaction);

      const block = await alchemy.core.getBlockWithTransactions(
        recentTransaction.blockNumber
      );
      setBlock(block);

      let value;
      for (let i = 0; i < block.transactions.length; i++) {
        if (recentTransaction.transactionHash === block.transactions[i].hash) {
          value = Utils.formatEther(block.transactions[i].value);
          setValue(value);
        }
      }
    };
    getTransaction();
  }, [id]);

  return (
    <Box color="white" height={window.innerHeight}>
      <Header />
      {!recentTransaction || !block ? (
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
        <Box flexDirection="row" justifyContent="start" paddingTop="1rem">
          <Container
            sx={{
              overflowY: "auto",
              maxHeight: "630px",
            }}
          >
            <Typography fontSize="20px" fontWeight="bold" color="white">
              #Transaction
            </Typography>
            <Table size="medium">
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
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">
                      Transaction Hash:
                    </Typography>
                    <Typography className="text-white">{id}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">TimeStamp:</Typography>
                    <Typography className="text-white">
                      {block.timestamp}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">From:</Typography>
                    <Typography
                      className="text-white"
                      color="teal"
                      sx={{
                        ":hover": {
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Link to={`/address/${recentTransaction.from}`}>
                        {recentTransaction.from}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">To:</Typography>
                    <Typography
                      className="text-white"
                      color="teal"
                      sx={{
                        ":hover": {
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Link to={`/address/${recentTransaction.to}`}>
                        {recentTransaction.to}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">Gas Used:</Typography>
                    <Typography className="text-white">
                      {recentTransaction.gasUsed.toString()}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">Gas Limit:</Typography>
                    <Typography className="text-white">
                      {block.gasLimit.toString()}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell
                    sx={{
                      display: "flex",
                      width: "80vw",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography className="text-white">Value:</Typography>
                    <Typography>
                      <Badge
                        sx={{
                          textAlign: "start",
                          backgroundColor: "white",
                          display: "flex",
                          borderRadius: "2px",
                          padding: "2px",
                        }}
                      >
                        {value} ETH
                      </Badge>
                    </Typography>
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

export default TransactionHash;
