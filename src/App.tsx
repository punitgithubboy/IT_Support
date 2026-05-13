import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTickets, createTicket } from './api/support';
import { ITSupportTicket } from './types';
import Header from './components/Header';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import NewTicketForm from './components/NewTicketForm';

function App() {
  const [tickets, setTickets] = useState<ITSupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<ITSupportTicket | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    const data = await fetchTickets();
    setTickets(data);
    setLoading(false);
  };

  const handleSelectTicket = (ticket: ITSupportTicket) => {
    setSelectedTicket(ticket);
  };

  const handleSubmitTicket = async (message: string) => {
    setSubmitting(true);
    try {
      const newTicket = await createTicket(message);
      setTickets(prev => [newTicket, ...prev]);
      setSelectedTicket(newTicket);
    } catch (error) {
      console.error('Failed to create ticket:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">New Support Request</h2>
              <NewTicketForm onSubmit={handleSubmitTicket} isSubmitting={submitting} />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
              <TicketList 
                tickets={tickets} 
                loading={loading} 
                selectedTicketId={selectedTicket?.id || null}
                onSelectTicket={handleSelectTicket} 
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold mb-4">Ticket Analysis</h2>
            <TicketDetails ticket={selectedTicket} />
          </motion.div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-200 py-4 px-6 text-center text-sm text-neutral-500">
        <p>IT Support Language Assistant &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;