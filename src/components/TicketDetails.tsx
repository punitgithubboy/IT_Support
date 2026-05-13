import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCogIcon, VibrateIcon as TranslateIcon, MessageCircleIcon, TagIcon } from 'lucide-react';
import { ITSupportTicket, ITSupportResponse } from '../types';
import Badge from './ui/Badge';
import Spinner from './ui/Spinner';
import LanguageIndicator from './ui/LanguageIndicator';
import { getTicketResponse, processTicket } from '../api/support';

interface TicketDetailsProps {
  ticket: ITSupportTicket | null;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  const [response, setResponse] = useState<ITSupportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticket) {
      setResponse(null);
      setError(null);
      return;
    }

    const fetchResponse = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTicketResponse(ticket.id);
        setResponse(data);
      } catch (err) {
        setError('Failed to fetch ticket response');
        console.error('Error fetching response:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [ticket]);

  const handleProcess = async () => {
    if (!ticket) return;
    
    setProcessing(true);
    setError(null);
    try {
      const data = await processTicket(ticket.id);
      setResponse(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process ticket';
      setError(errorMessage);
      console.error('Error processing ticket:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!ticket) {
    return (
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-8 h-full flex items-center justify-center">
        <p className="text-neutral-500">Select a ticket to view details</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-neutral-200">
        <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
        <div className="mb-4">
          <p className="text-sm font-medium text-neutral-500 mb-1">Original Message:</p>
          <p className="text-sm">{ticket.message}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-xs text-neutral-500">
            Submitted on {new Date(ticket.timestamp).toLocaleString()}
          </p>
          {!response && !loading && (
            <button 
              className="btn btn-primary"
              onClick={handleProcess}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <BrainCogIcon className="w-4 h-4 mr-2" />
                  Process Ticket
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="p-6 flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" />
        </div>
      ) : response ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="divide-y divide-neutral-200"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="w-4 h-4 text-primary-500" />
              <h4 className="text-sm font-medium">Category:</h4>
              <Badge variant="primary">{response.categoryMsg}</Badge>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <TranslateIcon className="w-4 h-4 text-secondary-500" />
              <h4 className="text-sm font-medium">Language:</h4>
              <LanguageIndicator language={response.originalLang} />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TranslateIcon className="w-4 h-4 text-secondary-500" />
                <h4 className="text-sm font-medium">Translated Message:</h4>
              </div>
              <p className="text-sm pl-6">{response.transMsg}</p>
            </div>
          </div>

          <div className="p-6 bg-neutral-50">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircleIcon className="w-4 h-4 text-accent-500" />
              <h4 className="text-sm font-medium">Response:</h4>
              <Badge variant="secondary">{response.originalLang}</Badge>
            </div>
            <p className="text-sm pl-6 mb-4">{response.response}</p>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-2">
                <TranslateIcon className="w-4 h-4 text-secondary-500" />
                <h4 className="text-sm font-medium">English Translation:</h4>
              </div>
              <p className="text-sm pl-6 text-neutral-700">{response.transResponse}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="p-6 text-center text-neutral-500">
          <BrainCogIcon className="w-8 h-8 mx-auto mb-2 text-neutral-400" />
          <p>This ticket hasn't been processed yet.</p>
          <p className="text-sm mt-1">Click "Process Ticket" to analyze and generate a response.</p>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;