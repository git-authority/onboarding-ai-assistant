# Onboarding AI Assistant

An AI-powered onboarding assistant that helps new employees quickly get up to speed with company policies, tools, benefits, and resources.

Built using the Mastra AI framework and Google Gemini, the assistant delivers fast, contextual, and conversational responses by searching company-provided onboarding documents. A modern React frontend provides an intuitive chat experience, while a Node.js backend handles AI logic, document retrieval, and APIs.

---

## What This Does

- Welcomes new hires with clear first-day guidance
- Answers questions about policies, tools, benefits, and company culture
- Searches uploaded onboarding documents intelligently
- Provides conversational, context-aware responses
- Understands onboarding-specific terminology and concerns

---

## Key Features

- Gemini-powered AI using Google Gemini 2.0 Flash
- Mastra agent-based architecture for modular AI logic
- Document upload and semantic search (Markdown, text, PDF)
- Automatic topic recognition (policies, tools, benefits, etc.)
- Full-stack architecture with frontend, backend, and database support

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Material UI

### Backend
- Node.js
- Express
- TypeScript
- Mastra AI Framework

### AI
- Google Gemini (Google AI API)

### Database
- Supabase

---

## Project Structure

```
onboarding-ai-assistant/
├── ai-agent-service/        # Backend (Mastra + Gemini)
│   ├── src/
│   ├── uploads/
│   └── package.json
│
├── src/                     # Frontend (React + Vite)
├── public/
│
├── supabase/                # Database config
│   └── migrations/
│
├── package.json
├── vite.config.ts
└── README.md

```


---

## Prerequisites

- Node.js 20.9.0 or higher
- npm
- Google AI API key (Gemini)
- Supabase project (optional but recommended)

---

## Installation

### Clone the repository
```bash
git clone https://github.com/git-authority/onboarding-ai-assistant.git
cd onboarding-ai-assistant
```

---

## Install frontend dependencies

```bash
npm install
```

---

## Install backend dependencies

```bash
cd ai-agent-service
npm install
```

---

## Running the Application

### Start the backend first

```bash
# from directory ai-agent-service
npm run dev
```

---

### Start the frontend

```bash
# from project root
npm run dev
```

---


## Example Questions

- I’m starting next week, what should I know?

- How do I set up my email and Slack?

- What is the remote work policy?

- How much vacation time do I get?

- Who should I contact for IT help?

- What benefits are available?

- How do I submit an expense report?


---


## Adding Knowledge

#### Upload documents such as:

- Onboarding guides and checklists

- Company policies (leave, remote work, expenses)

- Tool usage documentation

- Benefits information and HR FAQs

##### The assistant automatically searches these documents to answer employee questions accurately.