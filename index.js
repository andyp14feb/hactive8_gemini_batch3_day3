import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI }    from '@google/generative-ai';
// import { imageToGenerativePart } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/generate-from-image', upload.single('image'), async (req, res) => {
  const { prompt } = req.body || 'Describe the image';
  const imagePart = {
    inlineData: {
      data: fs.readFileSync(req.file.path, 'base64'),
      mimeType: req.file.mimetype,
    },
  };
  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    res.json({ output: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Gemini API server is running at http://localhost:${PORT}`);
});


app.post('/generate-from-document', upload.single('document'), async (req, res) => {
  const filePath = req.file.path;
  const buffer = fs.readFileSync(filePath);
  const base64Data = buffer.toString('base64');
  const mimeType=req.file.mimetype

  try {
    const documentPart = {
      inlineData: {
        data: base64Data,
        mimeType,}
      };

    const result = await model.generateContent(['Analyse this docment and provide a summary of its contents. Please include the following information in your response:\n\n- The main topic or theme of the document.\n- A brief description of each section, including subtopics if applicable.\n- Any key points or takeaways from the document.\n\nPlease provide your response in a bullet point format, with each bullet point on a new line.\n\n', documentPart]);
    const response = await result.response;
    res.json({output: response.text()});
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});


app.post('/generate-from-audio', upload.single('audio'), async (req, res) => {
  const audioBuffer = fs.readFileSync(req.file.path);
  const base64Audio = audioBuffer.toString('base64');
  const audioPart = {
    inlineData: {
     data: base64Audio,
     mimeType: req.file.mimetype
    }  
  }

  try{
    const result = await model.generateContent(['transcribe the audio', audioPart]);
    const response = await result.response;
    res.json({output: response.text()});
  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
  finally {
    fs.unlinkSync(req.file.path)
  }

});
