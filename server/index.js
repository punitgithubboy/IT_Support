import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Check if API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory data store (would be a database in production)
const tickets = [];
const responses = {};

// Routes
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const ticket = {
    id: `ticket-${Date.now()}`,
    message,
    timestamp: Date.now(),
    status: 'pending',
  };
  
  tickets.unshift(ticket);
  res.status(201).json(ticket);
});

app.get('/api/responses/:ticketId', (req, res) => {
  const { ticketId } = req.params;
  const response = responses[ticketId];
  
  if (!response) {
    return res.status(404).json({ error: 'Response not found' });
  }
  
  res.json(response);
});

app.post('/api/process', async (req, res) => {
  const { ticketId } = req.body;
  
  if (!ticketId) {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }
  
  const ticket = tickets.find(t => t.id === ticketId);
  
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  
  try {
    // Update ticket status
    ticket.status = 'processing';
    
    // Process with OpenAI
    const prompt = `
    Act as Information Technology (IT) customer support agent.
    For the support message mentioned below,
    use the following output format while generating the output response:
    {
      "originalMsg": "This is original customer IT support query message",
      "originalLang": "Detected language of the customer e.g. Spanish",
      "categoryMsg": "1 to 2 words describing the category of the message",
      "transMsg": "Translated customer IT support query language in English",
      "response": "Response to the customer in originalLang",
      "transResponse": "Response to the customer in English"
    }

    Customer IT support message:
    ${ticket.message}
    `;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    
    const responseText = completion.choices[0].message.content;
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
      
      // Add additional metadata
      responseData.id = ticketId;
      responseData.timestamp = Date.now();
      
      // Store response
      responses[ticketId] = responseData;
      
      // Update ticket status
      ticket.status = 'resolved';
      
      res.json(responseData);
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      res.status(500).json({ error: 'Failed to parse AI response' });
    }
  } catch (error) {
    console.error('Error processing ticket with OpenAI:', error);
    ticket.status = 'pending'; // Revert status
    res.status(500).json({ error: 'Failed to process ticket' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});