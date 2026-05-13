import React from 'react';
import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <InboxIcon className="w-12 h-12 text-neutral-400" />,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="rounded-full bg-neutral-100 p-4 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-800 mb-1">{title}</h3>
      {description && (
        <p className="text-neutral-500 mb-4 max-w-md">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;