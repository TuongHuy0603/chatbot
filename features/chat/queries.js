import { useMutation, useQuery } from '@tanstack/react-query';
import { callChat, getSuggestions } from './api';

export function useSendMessageMutation() {
  return useMutation({
    mutationFn: ({ conversationId, message }) => callChat({ conversationId, message }),
  });
}

export function useSuggestionsQuery(limit = 5) {
  return useQuery({
    queryKey: ['suggestions', limit],
    queryFn: () => getSuggestions(limit),
    staleTime: 60_000,
  });
}


