

# Day 3 Code Submission

This project is a submission for the "AI Productivity and AI API Integration for Developers" 4-day course, a partnership between Hacktiv8, AVPN, Google.org, and the Asian Development Bank. This program is part of the AI Opportunity Fund: Asia Pacific initiative.

## Project Summary

This project implements a simple Node.js Express server that acts as an API gateway to Google's Gemini 1.5 Flash generative AI model. It provides several endpoints to interact with the Gemini model, allowing users to generate text from prompts, analyze images, summarize documents, and transcribe audio, demonstrating multimodal AI capabilities.

**Key Features:**

- **Text Generation:** Generate creative or informative text based on a given prompt.
- **Image Analysis:** Describe and provide insights from uploaded images.
- **Document Analysis/Summarization:** Analyze and summarize the content of various document types.
- **Audio Transcription:** Transcribe spoken content from uploaded audio files into text.

The server handles file uploads (images, documents, audio), processes them by converting them to base64 encoding, and sends them to the Gemini API along with relevant prompts. It then returns the AI-generated responses to the client. Temporary uploaded files are automatically cleaned up after processing.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **`@google/generative-ai`:** The official Google Gemini API client library for Node.js.
- **`dotenv`:** To load environment variables from a `.env` file.
- **`multer`:** Middleware for handling `multipart/form-data`, primarily used for file uploads.
- **`fs` (Node.js File System):** For reading and deleting files.
- **`path` (Node.js Path):** For handling and transforming file paths.

## Setup and Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- A Google Cloud Project with the Gemini API enabled.
- A Gemini API Key (obtained from Google AI Studio or Google Cloud).

### Steps

1. **Clone the repository:**
   
   Bash
   
   ```
   git clone <your-repo-url>
   cd <your-project-folder>
   ```

2. **Install dependencies:**
   
   Bash
   
   ```
   npm install
   ```

3. Create a .env file:
   
   In the root of your project directory, create a file named .env and add your Gemini API key:
   
   ```
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   ```
   
   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key.

4. **Run the server:**
   
   Bash
   
   ```
   node depth.js
   ```
   
   or if you have `nodemon` installed for development:
   
   Bash
   
   ```
   nodemon depth.js
   ```
   
   The server will start on `http://localhost:3000`.

## API Endpoints

All endpoints are `POST` requests to `http://localhost:3000/`.

### 1. Generate Text

- **Endpoint:** `/generate-text`

- **Method:** `POST`

- **Body:** `application/json`
  
  JSON
  
  ```
  {
    "prompt": "Write a short poem about a rainy day."
  }
  ```

- **Response:**
  
  JSON
  
  ```
  {
    "output": "A gentle patter on the pane,\nThe world outside, a misty gain.\nFresh scents arise from thirsty ground,\nAs peaceful droplets soft resound."
  }
  ```

### 2. Generate from Image

- **Endpoint:** `/generate-from-image`

- **Method:** `POST`

- **Body:** `multipart/form-data`
  
  - **Field:** `image` (File) - The image file to analyze.
  - **Field (Optional):** `prompt` (Text) - A textual prompt to guide the image analysis (e.g., "Describe the objects in this picture," "What is the mood of this image?"). If no prompt is provided, it defaults to 'Describe the image'.

- **Example Usage (using `curl`):**
  
  Bash
  
  ```
  curl -X POST -F "image=@/path/to/your/image.jpg" -F "prompt=Describe the main subject of this image." http://localhost:3000/generate-from-image
  ```

- **Response:**
  
  JSON
  
  ```
  {
    "output": "The image shows a vibrant red sports car parked on a street."
  }
  ```

### 3. Generate from Document

- **Endpoint:** `/generate-from-document`

- **Method:** `POST`

- **Body:** `multipart/form-data`
  
  - **Field:** `document` (File) - The document file (e.g., PDF, DOCX, TXT) to summarize/analyze.

- **Prompt used by the server:** "Analyse this document and provide a summary of its contents. Please include the following information in your response:\n\n- The main topic or theme of the document.\n- A brief description of each section, including subtopics if applicable.\n- Any key points or takeaways from the document.\n\nPlease provide your response in a bullet point format, with each bullet point on a new line."

- **Example Usage (using `curl`):**
  
  Bash
  
  ```
  curl -X POST -F "document=@/path/to/your/document.pdf" http://localhost:3000/generate-from-document
  ```

- **Response:**
  
  JSON
  
  ```
  {
    "output": "- Main Topic: The history and evolution of artificial intelligence.\n- Section 1: Early concepts of AI in fiction and philosophy.\n- Section 2: The Dartmouth workshop and the birth of AI as a field.\n- Key Takeaways: AI has a long history, not just a recent phenomenon; the field is constantly evolving."
  }
  ```

### 4. Generate from Audio

- **Endpoint:** `/generate-from-audio`

- **Method:** `POST`

- **Body:** `multipart/form-data`
  
  - **Field:** `audio` (File) - The audio file (e.g., MP3, WAV) to transcribe.

- **Prompt used by the server:** "transcribe the audio"

- **Example Usage (using `curl`):**
  
  Bash
  
  ```
  curl -X POST -F "audio=@/path/to/your/audio.mp3" http://localhost:3000/generate-from-audio
  ```

- **Response:**
  
  JSON
  
  ```
  {
    "output": "Hello, welcome to the demonstration of audio transcription using Gemini."
  }
  ```

## Contributing

For the purpose of this course submission, contributions are not expected. However, for future development, feel free to fork the repository and submit pull requests.

## License

MIT License

---
