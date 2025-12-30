import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: 'processed' | 'processing' | 'error';
}

interface DocumentTableProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) {
    return <PictureAsPdfOutlinedIcon sx={{ color: 'error.main' }} />;
  }
  return <DescriptionOutlinedIcon sx={{ color: 'primary.main' }} />;
};

const getStatusChip = (status: Document['status']) => {
  const statusConfig = {
    processed: { label: 'Processed', color: 'success' as const },
    processing: { label: 'Processing', color: 'warning' as const },
    error: { label: 'Error', color: 'error' as const },
  };

  const config = statusConfig[status];
  return <Chip label={config.label} color={config.color} size="small" />;
};

const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'grey.800',
          borderRadius: 3,
        }}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No documents uploaded yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your first document using the drag & drop zone above
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.800' }}>
            <TableCell sx={{ fontWeight: 600 }}>Document</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Uploaded</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((doc) => (
            <TableRow
              key={doc.id}
              sx={{
                '&:hover': { bgcolor: 'grey.800' },
                transition: 'background-color 0.2s',
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {getFileIcon(doc.type)}
                  <Typography variant="body2" fontWeight={500}>
                    {doc.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {doc.type.toUpperCase()}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {doc.size}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {doc.uploadedAt.toLocaleDateString()}
                </Typography>
              </TableCell>
              <TableCell>{getStatusChip(doc.status)}</TableCell>
              <TableCell align="right">
                <Tooltip title="Delete document">
                  <IconButton
                    onClick={() => onDelete(doc.id)}
                    size="small"
                    sx={{
                      color: 'grey.400',
                      '&:hover': { color: 'error.main', bgcolor: 'error.50' },
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocumentTable;
