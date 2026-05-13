import React from 'react';
import { ITSupportTicket } from '../types';
import TicketItem from './TicketItem';
import EmptyState from './ui/EmptyState';
import { MessageSquareTextIcon } from 'lucide-react';
import Spinner from './ui/Spinner';

interface TicketListProps {
  tickets: ITSupportTicket[];
  loading: boolean;
  selectedTicketId: string | null;
  onSelectTicket: (ticket: ITSupportTicket) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  loading,
  selectedTicketId,
  onSelectTicket,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner size="lg" />
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <EmptyState
        title="No support tickets"
        description="No IT support tickets have been submitted yet."
        icon={<MessageSquareTextIcon className="w-12 h-12 text-neutral-400" />}
      />
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          onClick={onSelectTicket}
          isSelected={selectedTicketId === ticket.id}
        />
      ))}
    </div>
  );
};

export default TicketList;