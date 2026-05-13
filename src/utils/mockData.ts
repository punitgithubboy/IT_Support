import { ITSupportResponse, ITSupportTicket } from '../types';

export const DEMO_TICKETS: ITSupportTicket[] = [
  {
    id: '1',
    message: 'Näo consigo sincronizar meus contatos com o telefone. Sempre recebo uma mensagem de falha.',
    timestamp: Date.now() - 1000 * 60 * 30,
    status: 'pending',
  },
  {
    id: '2',
    message: 'Ho problemi a stampare i documenti da remoto. II lavoro non viene inviato alla stampante di rete.',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    status: 'processing',
  },
  {
    id: '3',
    message: '我无法远程打印文档。作业未发送至网络打印机。',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    status: 'resolved',
  },
  {
    id: '4',
    message: 'Internet badlantlm cok yavas ve bazen tamamen kesiliyor. Yardlm eder misiniz?',
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
    status: 'resolved',
  }
];

export const DEMO_RESPONSES: Record<string, ITSupportResponse> = {
  '1': {
    id: '1',
    originalMsg: 'Näo consigo sincronizar meus contatos com o telefone. Sempre recebo uma mensagem de falha.',
    originalLang: 'Portuguese',
    categoryMsg: 'Sync Issue',
    transMsg: "I can't sync my contacts with the phone. I always receive a failure message.",
    response: 'Por favor, tente reiniciar o seu telefone e verificar sua conexão com a internet. Se o problema persistir, verifique se a sua conta está configurada corretamente em Configurações.',
    transResponse: 'Please try restarting your phone and check your internet connection. If the problem persists, verify if your account is properly configured in Settings.',
    timestamp: Date.now() - 1000 * 60 * 15,
  },
  '3': {
    id: '3',
    originalMsg: '我无法远程打印文档。作业未发送至网络打印机。',
    originalLang: 'Chinese',
    categoryMsg: 'Printing Issue',
    transMsg: "I can't remotely print documents. The job is not sent to the network printer.",
    response: '请确保您的计算机和打印机连接到同一网络。此外，请检查打印机是否已开启并且准备就绪。如果问题仍然存在，请尝试重新安装打印机驱动程序。',
    transResponse: 'Please make sure your computer and printer are connected to the same network. Also, check if the printer is turned on and ready. If the problem still exists, try reinstalling the printer driver.',
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
  },
  '4': {
    id: '4',
    originalMsg: 'Internet badlantlm cok yavas ve bazen tamamen kesiliyor. Yardlm eder misiniz?',
    originalLang: 'Turkish',
    categoryMsg: 'Network Issue',
    transMsg: 'My internet connection is very slow and sometimes completely disconnects. Can you help me?',
    response: 'Lütfen modeminizi yeniden başlatın ve internet servis sağlayıcınızla bölgenizde bir kesinti olup olmadığını kontrol edin. Ayrıca, bilgisayarınızı diğer cihazlardan uzak tutarak sinyal karışmasını önleyin.',
    transResponse: 'Please restart your modem and check with your internet service provider if there is an outage in your area. Also, keep your computer away from other devices to prevent signal interference.',
    timestamp: Date.now() - 1000 * 60 * 60 * 7,
  }
};