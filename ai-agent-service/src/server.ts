import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { mastra } from './mastra';

// Debug environment variables
console.log('🔧 Environment check:');
console.log('   GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✓ configured' : '✗ missing');
console.log('   GOOGLE_GENERATIVE_AI_API_KEY:', process.env.GOOGLE_GENERATIVE_AI_API_KEY ? '✓ configured' : '✗ missing');

const app = express();
const PORT = process.env.PORT || 4111;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf', 
      'text/plain', 
      'text/markdown',
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype) || 
        file.originalname.endsWith('.md') || 
        file.originalname.endsWith('.mdx')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, TXT, MD files.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Document metadata storage (use a database in production)
interface DocumentMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'processed' | 'processing' | 'error';
  filePath: string;
  category?: string;
}

const documents: Map<string, DocumentMetadata> = new Map();

// =============================================================================
// ROUTES
// =============================================================================

// Chat endpoint - connects to the Onboarding Assistant
app.post('/api/chat/message', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build messages array with conversation history for context
    const messages = [
      ...conversationHistory.slice(-10).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Use the Onboarding Assistant agent
    const response = await mastra.getAgent('onboarding-assistant').generate(messages);

    // Clean up the response text
    let cleanResponse = response.text || "I'm sorry, I couldn't generate a response. Please try asking your question differently.";
    
    // Remove excessive markdown formatting for cleaner display
    cleanResponse = cleanResponse.replace(/\*\*(.*?)\*\*/g, '$1');
    cleanResponse = cleanResponse.replace(/\n\n\n+/g, '\n\n');
    cleanResponse = cleanResponse.trim();

    res.json({ 
      response: cleanResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Document upload endpoint
app.post('/api/documents/upload', upload.array('files'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const category = req.body.category || 'general';
    
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedDocs = [];

    for (const file of files) {
      const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const doc: DocumentMetadata = {
        id: docId,
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        uploadedAt: new Date(),
        status: 'processed',
        filePath: file.path,
        category
      };

      documents.set(docId, doc);
      uploadedDocs.push({
        id: doc.id,
        name: doc.name,
        type: getFileType(doc.type, doc.name),
        size: formatFileSize(doc.size),
        uploadedAt: doc.uploadedAt,
        status: doc.status,
        category: doc.category
      });
    }

    res.json({ 
      message: `${files.length} file(s) uploaded successfully`,
      documents: uploadedDocs
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to upload files',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    // Also scan the uploads directory for any files not in memory
    const uploadsDir = path.join(process.cwd(), 'uploads');
    try {
      const files = await fs.readdir(uploadsDir);
      for (const file of files) {
        // Skip hidden files
        if (file.startsWith('.')) continue;
        
        const existingDoc = Array.from(documents.values()).find(d => d.name === file || d.filePath.endsWith(file));
        if (!existingDoc) {
          const filePath = path.join(uploadsDir, file);
          const stat = await fs.stat(filePath);
          const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Detect file type from extension
          let mimeType = 'text/plain';
          if (file.endsWith('.pdf')) mimeType = 'application/pdf';
          else if (file.endsWith('.md') || file.endsWith('.mdx')) mimeType = 'text/markdown';
          else if (file.endsWith('.doc')) mimeType = 'application/msword';
          else if (file.endsWith('.docx')) mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          
          documents.set(docId, {
            id: docId,
            name: file,
            type: mimeType,
            size: stat.size,
            uploadedAt: stat.mtime,
            status: 'processed',
            filePath
          });
        }
      }
    } catch (error) {
      // Uploads directory might not exist yet
    }

    const docs = Array.from(documents.values()).map(doc => ({
      id: doc.id,
      name: doc.name,
      type: getFileType(doc.type, doc.name),
      size: formatFileSize(doc.size),
      uploadedAt: doc.uploadedAt,
      status: doc.status,
      category: doc.category || 'general'
    }));

    res.json(docs);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Delete document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = documents.get(id);
    
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Delete the file from disk
    try {
      await fs.unlink(doc.filePath);
    } catch (error) {
      console.warn('Failed to delete file from disk:', error);
    }

    documents.delete(id);
    res.json({ message: 'Document deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete document',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const apiKeyConfigured = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  
  res.json({ 
    status: apiKeyConfigured ? 'healthy' : 'degraded',
    service: 'Onboarding AI Assistant',
    timestamp: new Date().toISOString(),
    documentsCount: documents.size,
    apiKeyConfigured
  });
});

// =============================================================================
// HELPERS
// =============================================================================

function getFileType(mimeType: string, filename: string): string {
  if (filename.endsWith('.md') || filename.endsWith('.mdx')) return 'markdown';
  if (filename.endsWith('.txt')) return 'text';
  if (filename.endsWith('.pdf')) return 'pdf';
  if (filename.endsWith('.doc') || filename.endsWith('.docx')) return 'word';
  return mimeType.split('/')[1] || 'unknown';
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// =============================================================================
// ERROR HANDLING
// =============================================================================

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('🎉 ══════════════════════════════════════════════════════════');
  console.log('   Onboarding AI Assistant is running!');
  console.log('══════════════════════════════════════════════════════════════');
  console.log(`   🌐 Server: http://localhost:${PORT}`);
  console.log(`   💬 Chat:   POST /api/chat/message`);
  console.log(`   📄 Docs:   GET/POST /api/documents`);
  console.log(`   ❤️  Health: GET /api/health`);
  console.log('══════════════════════════════════════════════════════════════');
  console.log('');
});

export { documents };