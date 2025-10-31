import { api } from '../../lib/api';

export function callChat({ conversationId, message }) {
  return api('https://api.aicrm.com.vn/api/chat', {
    method: 'POST',
    data: {
      conversation_id: conversationId,
      message,
    },
  });
}

export function getSuggestions(limit = 5) {
  return api(`https://api.aicrm.com.vn/suggestions/random?limit=${limit}`);
}


