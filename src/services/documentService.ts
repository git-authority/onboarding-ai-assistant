import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4111/api';

export interface DocumentDisplay {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: 'processed' | 'processing' | 'error';
}

interface ApiDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
  category?: string;
}

export const documentService = {
  /**
   * Upload a document to the local backend
   */
  async uploadDocument(file: File): Promise<DocumentDisplay> {
    const formData = new FormData();
    formData.append('files', file);

    const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const doc = response.data.documents?.[0];
    if (!doc) {
      throw new Error('No document returned from upload');
    }

    return {
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      uploadedAt: new Date(doc.uploadedAt),
      status: doc.status,
    };
  },

  /**
   * Get all documents from the local backend (reads from uploads/ folder)
   */
  async getDocuments(): Promise<DocumentDisplay[]> {
    const response = await axios.get<ApiDocument[]>(`${API_BASE_URL}/documents`);
    
    return response.data.map((doc: ApiDocument) => ({
      id: doc.id,
      name: doc.name,
      type: doc.type,
      size: doc.size,
      uploadedAt: new Date(doc.uploadedAt),
      status: doc.status,
    }));
  },

  /**
   * Delete a document from the local backend
   */
  async deleteDocument(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/documents/${id}`);
  },
};
