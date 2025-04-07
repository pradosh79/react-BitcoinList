import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { bitcoinListQuery } from "../../../customHooks/queries/bitcoin.query";

export default function BitcoinList() {
  const { data, isLoading, isError, refetch } = bitcoinListQuery();
  const bitcoinData = data && data.data ? data.data : [];

  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    setRows(bitcoinData);
  }, [bitcoinData]);

  if (!Array.isArray(rows)) {
    setRows([]);
  }

  // Handle Sorting
  const handleSort = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);

    const sortedRows = [...rows].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });

    setRows(sortedRows);
  };

  // Handle Search
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredRows = bitcoinData.filter(
      (row) =>
        row.name.toLowerCase().includes(value) ||
        row.symbol.toLowerCase().includes(value) ||
        row.marketCapUsd.toString().includes(value)
    );

    setRows(filteredRows);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNameClick = async (row) => {
    setSelectedRow(row);

    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${row.id}`);
      const result = await response.json();
      setAdditionalData(result.data);
    } catch (error) {
      console.error("Error fetching additional data:", error);
      setAdditionalData(null);
    }
  };

  const handleClose = () => {
    setSelectedRow(null);
    setAdditionalData(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchText}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "id",
                "rank",
                "symbol",
                "name",
                "supply",
                "maxSupply",
                "marketCapUsd",
                "volumeUsd24Hr",
                "priceUsd",
                "changePercent24Hr",
                "vwap24Hr",
                "explorer",
              ].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? orderDirection : "asc"}
                    onClick={() => handleSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} style={{ cursor: "pointer" }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.rank}</TableCell>
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleNameClick(row)} color="primary">
                        {row.name}
                      </Button>
                    </TableCell>
                    <TableCell>{row.supply}</TableCell>
                    <TableCell>{row.maxSupply}</TableCell>
                    <TableCell>{row.marketCapUsd}</TableCell>
                    <TableCell>{row.volumeUsd24Hr}</TableCell>
                    <TableCell>{row.priceUsd}</TableCell>
                    <TableCell>{row.changePercent24Hr}</TableCell>
                    <TableCell>{row.vwap24Hr}</TableCell>
                    <TableCell>
                      <a href={row.explorer} target="_blank" rel="noopener noreferrer">
                        Explorer
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Dialog for selected row */}
      {selectedRow && (
        <Dialog open={true} onClose={handleClose}>
          <DialogTitle>{selectedRow.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Rank:</strong> {selectedRow.rank} <br />
              <strong>Symbol:</strong> {selectedRow.symbol} <br />
              <strong>Market Cap:</strong> {selectedRow.marketCapUsd} <br />
              <strong>Price:</strong> {selectedRow.priceUsd} <br />
              {additionalData && (
                <>
                  <strong>Explorer:</strong>{" "}
                  <a href={additionalData.explorer} target="_blank" rel="noopener noreferrer">
                    {additionalData.explorer}
                  </a>
                  <br />
                  <strong>Supply:</strong> {additionalData.supply} <br />
                  <strong>Max Supply:</strong> {additionalData.maxSupply} <br />
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}
