export interface ITSupportTicket {
  id: string;
  message: string;
  timestamp: number;
  status: 'pending' | 'processing' | 'resolved';
}

export interface ITSupportResponse {
  id: string;
  originalMsg: string;
  originalLang: string;
  categoryMsg: string;
  transMsg: string;
  response: string;
  transResponse: string;
  timestamp: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}