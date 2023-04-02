import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { alchemy } from "./Home";
import {
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

const Block = () => {
  const { id } = useParams();
  const [block, setBlock] = useState();

  useEffect(() => {
    const getBlock = async () => {
      const block = await alchemy.core.getBlock(Number(id));
      setBlock(block);
    };
    getBlock();
  }, [id]);

  return (
    <Box color="white" height={window.innerHeight}>
      <Header />
      {!block ? (
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
          <Container>
            <Typography fontSize="20px" fontWeight="bold" color="white">
              #Block {id}
            </Typography>
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
                    <Typography className="text-white">Gas Used:</Typography>
                    <Typography className="text-white">
                      {block.gasUsed.toString()}
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
                    <Typography className="text-white">Hash:</Typography>
                    <Typography className="text-white">{block.hash}</Typography>
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
                    <Typography className="text-white">Miner:</Typography>
                    <Typography
                      className="text-white"
                      color="teal"
                      sx={{
                        ":hover": {
                          opacity: 0.9,
                        },
                      }}
                    >
                      <Link to={`/address/${block.miner}`}>{block.miner}</Link>
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
                    <Typography className="text-white">Block Height:</Typography>
                    <Typography className="text-white">{id}</Typography>
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

export default Block;
