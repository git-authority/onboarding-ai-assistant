import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import DocumentUploadZone from '@/components/admin/DocumentUploadZone';
import DocumentTable, { Document } from '@/components/admin/DocumentTable';
import { documentService, DocumentDisplay } from '@/services/documentService';

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load existing documents on component mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const docs = await documentService.getDocuments();
      // Map DocumentDisplay to Document format expected by DocumentTable
      const mappedDocs: Document[] = docs.map((doc: DocumentDisplay) => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        uploadedAt: doc.uploadedAt,
        status: doc.status,
      }));
      setDocuments(mappedDocs);
      setError(null);
    } catch (error) {
      console.error('Failed to load documents:', error);
      setError('Failed to load documents. Please ensure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files: File[]) => {
    try {
      setIsUploading(true);
      setError(null);
      setSuccessMessage(null);

      // Upload each file to Supabase
      const uploadPromises = files.map(file => documentService.uploadDocument(file));
      const results = await Promise.all(uploadPromises);

      // Reload documents to show the new uploads
      await loadDocuments();
      
      setSuccessMessage(`Successfully uploaded ${results.length} file(s)`);
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await documentService.deleteDocument(id);
      await loadDocuments(); // Reload to reflect changes
      setError(null);
      setSuccessMessage('Document deleted successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Delete failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Document Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Upload and manage knowledge base documents for the AI chatbot
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ mb: 4, position: 'relative' }}>
        <DocumentUploadZone onUpload={handleUpload} />
        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 3,
            }}
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Uploading...</Typography>
          </Box>
        )}
      </Box>

      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Uploaded Documents ({documents.length})
      </Typography>
      
      {isLoading && !isUploading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DocumentTable documents={documents} onDelete={handleDelete} />
      )}
    </Box>
  );
};

export default DocumentsPage;
