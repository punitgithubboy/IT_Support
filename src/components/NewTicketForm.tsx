import React, { useState } from 'react';
import { SendIcon } from 'lucide-react';
import Spinner from './ui/Spinner';

interface NewTicketFormProps {
  onSubmit: (message: string) => Promise<void>;
  isSubmitting: boolean;
}

const NewTicketForm: React.FC<NewTicketFormProps> = ({ onSubmit, isSubmitting }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSubmitting) {
      await onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="card">
        <textarea
          className="w-full p-3 resize-none focus:outline-none focus:ring-0 border-none bg-transparent"
          placeholder="Type your IT support request in any language..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          disabled={isSubmitting}
        />
        <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex justify-between items-center">
          <p className="text-xs text-neutral-500">
            We'll automatically detect the language and provide assistance.
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!message.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <Spinner size="sm" className="mr-2" />
            ) : (
              <SendIcon className="w-4 h-4 mr-2" />
            )}
            Submit Request
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewTicketForm;