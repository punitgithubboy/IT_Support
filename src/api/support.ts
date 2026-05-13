import axios from 'axios';
import { ITSupportResponse, ITSupportTicket } from '../types';
import { DEMO_TICKETS, DEMO_RESPONSES } from '../utils/mockData';

// Server URL should come from environment variables in production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Keep a local copy of tickets for development
let localTickets = [...DEMO_TICKETS];

export const fetchTickets = async (): Promise<ITSupportTicket[]> => {
  try {
    // Uncomment when backend is ready
    // const response = await axios.get(`${API_URL}/tickets`);
    // return response.data;

    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localTickets);
      }, 800);
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

export const createTicket = async (message: string): Promise<ITSupportTicket> => {
  try {
    // Uncomment when backend is ready
    // const response = await axios.post(`${API_URL}/tickets`, { message });
    // return response.data;

    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTicket: ITSupportTicket = {
          id: `temp-${Date.now()}`,
          message,
          timestamp: Date.now(),
          status: 'pending',
        };
        localTickets.unshift(newTicket);
        resolve(newTicket);
      }, 1000);
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error('Failed to create ticket');
  }
};

export const getTicketResponse = async (ticketId: string): Promise<ITSupportResponse | null> => {
  try {
    // Uncomment when backend is ready
    // const response = await axios.get(`${API_URL}/responses/${ticketId}`);
    // return response.data;

    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return existing mock response if available, otherwise generate a new one
        if (DEMO_RESPONSES[ticketId]) {
          resolve(DEMO_RESPONSES[ticketId]);
        } else {
          resolve(null);
        }
      }, 1500);
    });
  } catch (error) {
    console.error('Error fetching ticket response:', error);
    return null;
  }
};

export const processTicket = async (ticketId: string): Promise<ITSupportResponse> => {
  try {
    // Uncomment when backend is ready
    // const response = await axios.post(`${API_URL}/process`, { ticketId });
    // return response.data;

    // Mock response for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const ticket = localTickets.find(t => t.id === ticketId);
        
        if (!ticket) {
          reject(new Error(`Ticket with ID ${ticketId} not found in mock data.`));
          return;
        }
        
        // Update ticket status
        ticket.status = 'resolved';
        
        // Generate a simulated response
        const response: ITSupportResponse = {
          id: ticketId,
          originalMsg: ticket.message,
          originalLang: 'English', // In a real app, this would be detected
          categoryMsg: 'General Issue',
          transMsg: ticket.message,
          response: "We've received your request and are working on it. Please try restarting your device and check if the issue persists.",
          transResponse: "We've received your request and are working on it. Please try restarting your device and check if the issue persists.",
          timestamp: Date.now(),
        };
        resolve(response);
      }, 3000);
    });
  } catch (error) {
    console.error('Error processing ticket:', error);
    throw error instanceof Error ? error : new Error('Failed to process ticket');
  }
};