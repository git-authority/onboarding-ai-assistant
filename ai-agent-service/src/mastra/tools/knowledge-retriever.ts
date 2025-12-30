import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

// --- Constants ---
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "by", "with", "at", "as",
  "is", "are", "was", "were", "be", "being", "been", "from", "that", "this", "these", "those",
  "it", "its", "into", "about", "over", "under", "up", "down", "what", "how", "when", "where", "why",
  "i", "me", "my", "we", "our", "you", "your", "do", "does", "did", "can", "could", "would", "should"
]);

// Onboarding-specific topic patterns for better matching
const TOPIC_PATTERNS = {
  // Getting Started
  onboarding: /\b(onboarding|first day|first week|new hire|new employee|getting started|orientation|welcome)\b/gi,
  setup: /\b(setup|set up|account|login|password|access|credentials|laptop|equipment|hardware)\b/gi,
  
  // Company Tools & Systems
  tools: /\b(tool|software|app|application|system|platform|slack|email|calendar|zoom|teams)\b/gi,
  communication: /\b(slack|email|teams|chat|message|meeting|call|video|communicate)\b/gi,
  
  // Policies
  timeoff: /\b(vacation|pto|paid time off|time off|holiday|days off|leave)\b/gi,
  remote: /\b(remote|work from home|wfh|telecommute|hybrid|office|in-person)\b/gi,
  expenses: /\b(expense|reimbursement|receipt|travel|per diem|spending|budget)\b/gi,
  
  // Benefits
  benefits: /\b(health|insurance|medical|dental|vision|401k|retirement|benefit|hsa|fsa)\b/gi,
  perks: /\b(perk|discount|gym|wellness|learning|development|training|education)\b/gi,
  
  // Culture & People
  culture: /\b(culture|value|mission|team|colleague|coworker|manager|department)\b/gi,
  hr: /\b(hr|human resources|personnel|employee|policy|procedure|guideline)\b/gi,
  
  // Leave & Time
  leave: /\b(sick leave|maternity|paternity|fmla|parental|bereavement|absence)\b/gi,
  schedule: /\b(schedule|hours|time|clock|shift|flexible|core hours)\b/gi,
};

// --- PDF Text Extraction ---
async function extractPdfText(filePath: string): Promise<string> {
  try {
    // Dynamic import for pdf-parse
    const pdfParse = (await import('pdf-parse')).default;
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text || '';
  } catch (error) {
    console.error(`Error parsing PDF ${filePath}:`, error);
    // Return filename-based content as fallback
    const fileName = path.basename(filePath, '.pdf');
    return `[PDF Document: ${fileName}] - Key topics from filename: ${fileName.replace(/[-_]/g, ' ')}`;
  }
}

// --- Local file reading with PDF support ---
async function readFileContent(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();
  
  try {
    if (ext === '.pdf') {
      return await extractPdfText(filePath);
    } else if (ext === '.txt' || ext === '.md' || ext === '.mdx') {
      return await fs.readFile(filePath, 'utf8');
    } else if (ext === '.doc' || ext === '.docx') {
      // For Word docs, return filename info (would need mammoth.js for full parsing)
      const fileName = path.basename(filePath, ext);
      return `[Word Document: ${fileName}] - Key topics from filename: ${fileName.replace(/[-_]/g, ' ')}`;
    } else {
      return await fs.readFile(filePath, 'utf8');
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

// --- Get all local documents from uploads folder ---
async function getLocalDocuments(): Promise<{ name: string; content: string }[]> {
  const documents: { name: string; content: string }[] = [];
  const uploadsDir = path.join(process.cwd(), 'uploads');
  
  try {
    await fs.access(uploadsDir);
    const files = await fs.readdir(uploadsDir);
    
    console.log(`📁 Found ${files.length} files in uploads directory`);
    
    for (const file of files) {
      // Skip hidden files and non-document files
      if (file.startsWith('.')) continue;
      if (!/\.(md|mdx|txt|pdf|doc|docx)$/i.test(file)) continue;
      
      const filePath = path.join(uploadsDir, file);
      const stat = await fs.stat(filePath);
      
      // Skip files that are too large
      if (stat.size > MAX_FILE_SIZE) {
        console.warn(`Skipping ${file}: file too large (${stat.size} bytes)`);
        continue;
      }
      
      const content = await readFileContent(filePath);
      if (content) {
        documents.push({ name: file, content });
        console.log(`✓ Loaded: ${file} (${content.length} chars)`);
      }
    }
  } catch (error) {
    console.warn('Uploads directory not accessible:', error);
  }
  
  return documents;
}

// --- Helper functions ---

function extractSearchTokens(query: string): { phrases: string[]; words: string[]; topics: string[] } {
  const phrases: string[] = [];
  let rest = query;
  const topics: string[] = [];

  // Extract "quoted phrases"
  const quoteRe = /"([^"]{2,})"/g;
  let m: RegExpExecArray | null;
  while ((m = quoteRe.exec(query))) {
    phrases.push(m[1].toLowerCase().trim());
  }
  rest = query.replace(quoteRe, " ");

  // Identify relevant topics
  for (const [topic, pattern] of Object.entries(TOPIC_PATTERNS)) {
    if (pattern.test(query)) {
      topics.push(topic);
    }
  }

  // Extract remaining words (>=2 chars, not stopwords)
  const words = rest
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= 2 && !STOPWORDS.has(w));

  return { phrases, words, topics };
}

function countOccurrences(text: string, needle: string): { count: number; first: number } {
  let count = 0;
  let first = -1;
  let pos = 0;
  const lowerText = text.toLowerCase();
  const lowerNeedle = needle.toLowerCase();
  
  while (true) {
    const i = lowerText.indexOf(lowerNeedle, pos);
    if (i === -1) break;
    if (first === -1) first = i;
    count++;
    pos = i + Math.max(lowerNeedle.length, 1);
  }
  return { count, first };
}

export const knowledgeRetriever = createTool({
  id: "knowledgeRetriever",
  description: "Search the company knowledge base for onboarding information, policies, tools documentation, and FAQs to help new hires.",
  inputSchema: z.object({
    query: z.string().min(2).describe("The search query - what the new hire is asking about"),
    maxResults: z.number().int().min(1).max(10).default(5).describe("Maximum number of results to return"),
    category: z.string().optional().describe("Optional category filter: onboarding, policies, tools, benefits, culture"),
  }),

  execute: async (raw: any) => {
    // Handle different input formats
    const base =
      (raw && typeof raw === "object" && "context" in raw && (raw as any).context) ??
      (raw && typeof raw === "object" && "input" in raw && (raw as any).input) ??
      raw ?? {};

    const query = (base?.query ?? "").toString().trim();
    const maxResults = typeof base?.maxResults === "number" ? base.maxResults : 5;

    if (!query) {
      return { results: [], error: "Please provide a search query." };
    }

    // Get documents from local uploads folder
    console.log('🔍 Fetching documents from local uploads folder...');
    const allDocs = await getLocalDocuments();
    console.log(`📄 Found ${allDocs.length} documents total`);
    
    if (allDocs.length === 0) {
      return { 
        results: [], 
        error: "No knowledge base documents found. Please upload onboarding materials to get started." 
      };
    }

    const { phrases, words, topics } = extractSearchTokens(query);
    const tokens = [...phrases, ...words];
    
    if (tokens.length === 0) {
      return { results: [], info: "Could not identify searchable terms in your question." };
    }

    type SearchResult = {
      file: string;
      excerpt: string;
      firstIndex: number;
      tokenMatches: number;
      occurrences: number;
      topicMatches: number;
      score: number;
    };

    // Search through all documents
    const searchResults: SearchResult[] = [];
    
    for (const doc of allDocs) {
      try {
        const content = doc.content;
        if (!content || content.length > MAX_FILE_SIZE) continue;
        
        const lower = content.toLowerCase();
        const fileNameLower = doc.name.toLowerCase();

        let totalOcc = 0;
        let tokenMatches = 0;
        let firstIndex = -1;
        let topicMatches = 0;

        // Check for topic matches in content
        for (const topic of topics) {
          const pattern = TOPIC_PATTERNS[topic as keyof typeof TOPIC_PATTERNS];
          if (pattern && pattern.test(content)) {
            topicMatches++;
          }
        }

        // Count token occurrences
        for (const token of tokens) {
          const { count, first } = countOccurrences(lower, token);
          if (count > 0) {
            totalOcc += count;
            tokenMatches++;
            if (firstIndex === -1 || first < firstIndex) {
              firstIndex = first;
            }
          }
          
          // Also check filename
          if (fileNameLower.includes(token)) {
            tokenMatches++;
            totalOcc += 5; // Filename matches are valuable
          }
        }

        if (totalOcc === 0 && topicMatches === 0) continue;

        // Extract relevant excerpt around the first match
        let excerpt: string;
        if (firstIndex >= 0) {
          const excerptStart = Math.max(0, firstIndex - 150);
          const excerptEnd = Math.min(content.length, firstIndex + 400);
          excerpt = content.substring(excerptStart, excerptEnd).trim();
          
          // Clean up excerpt - try to start/end at sentence boundaries
          if (excerptStart > 0) excerpt = '...' + excerpt;
          if (excerptEnd < content.length) excerpt = excerpt + '...';
        } else {
          excerpt = content.substring(0, 500).trim() + '...';
        }

        // Calculate relevance score
        const score = 
          (tokenMatches * 15) +           // Base score for token matches
          (totalOcc * 2) +                // Frequency bonus
          (topicMatches * 25) +           // Topic match bonus
          (phrases.some(p => lower.includes(p)) ? 20 : 0) + // Phrase match bonus
          (firstIndex >= 0 ? Math.max(0, 15 - Math.floor(firstIndex / 100)) : 0); // Early match bonus

        searchResults.push({
          file: doc.name,
          excerpt,
          firstIndex: firstIndex >= 0 ? firstIndex : 0,
          tokenMatches,
          occurrences: totalOcc,
          topicMatches,
          score
        });

      } catch (e: any) {
        console.error(`Error processing document ${doc.name}:`, e);
      }
    }
    
    if (searchResults.length === 0) {
      return { 
        results: [], 
        info: "I couldn't find specific information about that in our knowledge base. Try rephrasing your question or ask your manager/HR for help." 
      };
    }

    // Sort by relevance score and limit results
    const sortedResults = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    const results = sortedResults.map(result => ({
      content: result.excerpt,
      source: result.file,
      relevanceScore: result.score,
      matchedTopics: topics.filter(t => {
        const pattern = TOPIC_PATTERNS[t as keyof typeof TOPIC_PATTERNS];
        return pattern && pattern.test(result.excerpt);
      })
    }));

    const sources = [...new Set(sortedResults.map(r => r.file))];

    return {
      results,
      sources,
      totalDocuments: allDocs.length,
      query,
      topics,
      info: `Found ${results.length} relevant section(s) from ${sources.length} document(s)`
    };
  }
});
