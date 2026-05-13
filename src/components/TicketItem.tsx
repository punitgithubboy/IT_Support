import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { ITSupportTicket } from '../types';
import Badge from './ui/Badge';

interface TicketItemProps {
  ticket: ITSupportTicket;
  onClick: (ticket: ITSupportTicket) => void;
  isSelected: boolean;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onClick, isSelected }) => {
  const { message, timestamp, status } = ticket;

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusConfig = {
    pending: { icon: ClockIcon, text: 'Pending', variant: 'warning' as const },
    processing: { icon: MessageCircleIcon, text: 'Processing', variant: 'primary' as const },
    resolved: { icon: CheckCircleIcon, text: 'Resolved', variant: 'success' as const },
  };

  const { icon: StatusIcon, text: statusText, variant } = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-4 cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected ? 'border-l-primary-500 bg-primary-50' : 'border-l-transparent hover:bg-neutral-50'
      }`}
      onClick={() => onClick(ticket)}
    >
      <div className="flex justify-between items-start mb-2">
        <Badge variant={variant}>
          <StatusIcon className="w-3 h-3 mr-1" />
          <span>{statusText}</span>
        </Badge>
        <span className="text-xs text-neutral-500">{formattedTime}</span>
      </div>

      <p className="text-sm line-clamp-2 mb-2">
        {message}
      </p>
    </motion.div>
  );
};

export default TicketItem;