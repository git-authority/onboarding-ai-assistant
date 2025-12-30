import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Rating,
} from "@mui/material";
import StatsCard from "@/components/admin/StatsCard";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

interface ChatLog {
  id: string;
  user: string;
  question: string;
  timestamp: Date;
  satisfaction: "positive" | "negative" | "neutral";
}

const recentChatLogs: ChatLog[] = [
  {
    id: "1",
    user: "John Smith",
    question: "How do I access the VPN?",
    timestamp: new Date("2024-01-20T10:30:00"),
    satisfaction: "positive",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    question: "What are the health insurance options?",
    timestamp: new Date("2024-01-20T09:45:00"),
    satisfaction: "positive",
  },
  {
    id: "3",
    user: "Mike Davis",
    question: "Where is the parking lot?",
    timestamp: new Date("2024-01-20T09:15:00"),
    satisfaction: "neutral",
  },
  {
    id: "4",
    user: "Emily Brown",
    question: "How do I request time off?",
    timestamp: new Date("2024-01-19T16:30:00"),
    satisfaction: "positive",
  },
  {
    id: "5",
    user: "David Wilson",
    question: "What is the dress code policy?",
    timestamp: new Date("2024-01-19T14:00:00"),
    satisfaction: "negative",
  },
];

const getSatisfactionChip = (satisfaction: ChatLog["satisfaction"]) => {
  const config = {
    positive: {
      icon: <ThumbUpOutlinedIcon fontSize="small" />,
      color: "success" as const,
      label: "Helpful",
    },
    negative: {
      icon: <ThumbDownOutlinedIcon fontSize="small" />,
      color: "error" as const,
      label: "Not Helpful",
    },
    neutral: {
      icon: null,
      color: "default" as const,
      label: "No Feedback",
    },
  };

  const cfg = config[satisfaction];
  return (
    <Chip
      icon={cfg.icon || undefined}
      label={cfg.label}
      color={cfg.color}
      size="small"
      variant="outlined"
    />
  );
};

const AnalyticsPage: React.FC = () => {
  const satisfactionStats = [
    {
      title: "Positive Feedback",
      value: "847",
      change: 15,
      icon: <SentimentSatisfiedAltIcon />,
      color: "success" as const,
    },
    {
      title: "Negative Feedback",
      value: "56",
      change: -8,
      icon: <SentimentVeryDissatisfiedIcon />,
      color: "error" as const,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Monitor chatbot performance and user satisfaction
        </Typography>
      </Box>

      {/* Satisfaction Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        {satisfactionStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </Box>

      {/* Average Rating */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Average Satisfaction Rating
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Rating value={4.2} precision={0.1} readOnly size="large" />
          <Typography variant="h5" fontWeight={700}>
            4.2 / 5.0
          </Typography>
          <Chip label="Based on 903 reviews" size="small" variant="outlined" />
        </Box>
      </Paper>

      {/* Recent Chat Logs */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Recent Chat Logs
      </Typography>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentChatLogs.map((log) => (
              <TableRow
                key={log.id}
                sx={{
                  "&:hover": { bgcolor: "grey.800" },
                  transition: "background-color 0.2s",
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {log.user}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {log.question}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {log.timestamp.toLocaleString()}
                  </Typography>
                </TableCell>

                <TableCell>{getSatisfactionChip(log.satisfaction)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AnalyticsPage;
