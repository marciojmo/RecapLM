# RecapLM

An AI-powered quiz application that helps you revise and test your knowledge on any topic. RecapLM generates personalized multiple-choice questions using Large Language Models (LLMs) and provides detailed explanations for each answer.

## Features

- **Dynamic Quiz Generation**: Create quizzes on any topic you want to revise
- **AI-Powered Questions**: Questions are generated using advanced LLM models
- **Detailed Explanations**: Get comprehensive explanations for correct and incorrect answers
- **Session Tracking**: Track your progress and performance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **LLM Integration**: Support for OpenAI GPT and Google Gemini
- **Validation**: Zod for type safety

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# LLM Provider (required)
# Options: 'openai', 'gemini', 'mock'
LLM_PROVIDER=gemini

# API Keys (required based on provider)
# For OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# For Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

### Provider Options

- **`openai`**: Uses OpenAI's GPT-3.5-turbo model
- **`gemini`**: Uses Google's Gemini 1.5 Flash model
- **`mock`**: Uses mock data for development/testing (no API key required)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recaplm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Enter any topic you want to revise (e.g., "photosynthesis", "binary trees", "World War II")
2. Click "Start" to begin your quiz session
3. Answer multiple-choice questions and review explanations
4. Track your progress and end the session when finished
5. Review your performance summary

## Development

- **Build**: `npm run build`
- **Start Production**: `npm start`
- **Lint**: `npm run lint`

## Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Remember to set your environment variables in your deployment platform's dashboard.

## Disclaimer

RecapLM is an AI-powered tool and may occasionally generate incorrect or incomplete information. Always verify important facts from reliable sources.
