import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Search,
  FilterList,
  InfoOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Mock data for demonstration - replace with your API call
const mockExchanges = Array.from({ length: 50 }, (_, i) => ({
  id: `EX-${1000 + i}`,
  date: new Date(2023, 0, 1 + i).toISOString(),
  product: `Product ${(i % 10) + 1}`,
  exchangeWith: `User ${(i % 8) + 1}`,
  status: ["completed", "pending", "canceled", "processing"][i % 4],
  value: Math.floor(Math.random() * 500) + 50,
}));

const statusColors = {
  completed: {
    bg: "rgba(46, 204, 113, 0.15)",
    text: "rgba(46, 204, 113, 0.9)",
    border: "rgba(46, 204, 113, 0.3)",
  },
  pending: {
    bg: "rgba(243, 156, 18, 0.15)",
    text: "rgba(243, 156, 18, 0.9)",
    border: "rgba(243, 156, 18, 0.3)",
  },
  canceled: {
    bg: "rgba(231, 76, 60, 0.15)",
    text: "rgba(231, 76, 60, 0.9)",
    border: "rgba(231, 76, 60, 0.3)",
  },
  processing: {
    bg: "rgba(52, 152, 219, 0.15)",
    text: "rgba(52, 152, 219, 0.9)",
    border: "rgba(52, 152, 219, 0.3)",
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ExchangeHistory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    // Simulate API call
    const fetchExchanges = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setExchanges(mockExchanges);
        setError(null);
      } catch (err) {
        setError("Failed to load exchange history. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredExchanges = exchanges.filter(
    (exchange) =>
      exchange.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exchange.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exchange.exchangeWith.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        bgcolor: "#0f172a", // Dark blue background matching header/footer
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          py: 4,
          flex: 1,
          color: "white",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "#0f172a",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
                mb: 4,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: 600 }}
                >
                  Danh sách trao đổi
                </Typography>

                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    placeholder="Tìm kiếm..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        background: "rgba(30, 41, 59, 0.8)",
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(99, 102, 241, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(99, 102, 241, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6366f1",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "white",
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.5)",
                          opacity: 1,
                        },
                      },
                    }}
                  />

                  <Tooltip title="Lọc kết quả">
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                        borderRadius: 2,
                        "&:hover": {
                          bgcolor: "rgba(99, 102, 241, 0.2)",
                        },
                      }}
                    >
                      <FilterList />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <TableContainer
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(99, 102, 241, 0.3)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(15, 23, 42, 0.5)",
                  },
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        ID giao dịch
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Ngày
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Sản phẩm
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Đối tác
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Giá trị
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                          fontWeight: 600,
                        }}
                      >
                        Chi tiết
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredExchanges
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((exchange) => (
                        <TableRow
                          key={exchange.id}
                          hover
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(99, 102, 241, 0.1)",
                            },
                            "& .MuiTableCell-root": {
                              borderBottom: "1px solid rgba(99, 102, 241, 0.1)",
                              color: "white",
                            },
                          }}
                        >
                          <TableCell>{exchange.id}</TableCell>
                          <TableCell>{formatDate(exchange.date)}</TableCell>
                          <TableCell>{exchange.product}</TableCell>
                          <TableCell>{exchange.exchangeWith}</TableCell>
                          <TableCell>
                            {exchange.value.toLocaleString()} ₫
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                {
                                  completed: "Hoàn thành",
                                  pending: "Chờ xác nhận",
                                  canceled: "Đã hủy",
                                  processing: "Đang xử lý",
                                }[exchange.status]
                              }
                              sx={{
                                backgroundColor:
                                  statusColors[exchange.status].bg,
                                color: statusColors[exchange.status].text,
                                borderColor:
                                  statusColors[exchange.status].border,
                                borderWidth: 1,
                                borderStyle: "solid",
                                "& .MuiChip-label": {
                                  px: 1,
                                  fontWeight: 600,
                                },
                              }}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              sx={{
                                color: "#6366f1",
                                "&:hover": {
                                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                                },
                              }}
                            >
                              <VisibilityOutlined fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredExchanges.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  color: "white",
                  borderTop: "1px solid rgba(99, 102, 241, 0.1)",
                  ".MuiTablePagination-selectIcon": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                  ".MuiTablePagination-select": {
                    color: "white",
                  },
                  ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  ".MuiIconButton-root": {
                    color: "white",
                  },
                  ".Mui-disabled": {
                    color: "rgba(255, 255, 255, 0.3) !important",
                  },
                }}
              />
            </Paper>

            <Box
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                bgcolor: "rgba(30, 41, 59, 0.4)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <InfoOutlined sx={{ color: "rgba(99, 102, 241, 0.9)" }} />
              <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                Bạn chỉ có thể xem lịch sử trao đổi trong 3 tháng gần đây. Vui
                lòng liên hệ hỗ trợ nếu cần truy cập trao đổi cũ hơn.
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ExchangeHistory;
