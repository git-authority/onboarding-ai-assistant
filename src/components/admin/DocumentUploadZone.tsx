import React, { useCallback } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useDropzone } from 'react-dropzone';

interface DocumentUploadZoneProps {
  onUpload: (files: File[]) => void;
}

const DocumentUploadZone: React.FC<DocumentUploadZoneProps> = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md', '.mdx'],
    },
  });

  return (
    <Paper
      {...getRootProps()}
      elevation={0}
      sx={{
        p: 4,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        bgcolor: isDragActive ? 'primary.50' : 'grey.50',
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        },
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: isDragActive ? 'primary.main' : 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <CloudUploadOutlinedIcon
            sx={{
              fontSize: 32,
              color: isDragActive ? 'white' : 'grey.500',
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" fontWeight={600} color="text.primary">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            or click to browse
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Supported formats: PDF, DOC, DOCX, TXT, MD
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentUploadZone;
