// Mock AI responses
const mockResponses = [
  {
    keyword: "hello|hi|hey|xin chào",
    responses: [
      "Hello! I'm your AI assistant. How can I help you today? 🌸",
      "Hi there! What would you like to know? ✨",
      "Hey! I'm here to assist you. What can I do for you? 💫",
    ],
  },
  {
    keyword: "help|assist|support|giúp",
    responses: [
      "I'm here to help! What do you need assistance with?",
      "I can help you with questions, suggestions, or just chat! What would you like?",
      "Feel free to ask me anything. I'm here to assist you!",
    ],
  },
  {
    keyword: "business|marketing|strategy|chiến lược",
    responses: [
      "For business growth, I recommend focusing on social media marketing and email campaigns. These channels provide the best ROI! 📈",
      "A solid marketing strategy starts with understanding your target audience. Define demographics and create buyer personas first.",
      "Digital marketing is key! Consider social media, SEO, and paid advertising for maximum reach.",
    ],
  },
  {
    keyword: "product|service|sản phẩm|dịch vụ",
    responses: [
      "Our products/services are designed with you in mind! What specifically interests you?",
      "I'd love to tell you more about our offerings. What are you looking for?",
      "We have great solutions for you! What area are you curious about?",
    ],
  },
  {
    keyword: "pricing|price|cost|giá|giá cả",
    responses: [
      "We offer competitive pricing with flexible plans. Would you like to see specific options?",
      "Price varies based on your needs. Let's discuss what works best for you!",
      "Our pricing is transparent and value-focused. What's your use case?",
    ],
  },
  {
    keyword: "thank|thanks|thanks|cảm ơn",
    responses: [
      "You're very welcome! Happy to help! 😊",
      "Anytime! Feel free to ask if you need anything else.",
      "My pleasure! Let me know if you have more questions.",
    ],
  },
  {
    keyword: "bye|goodbye|see you|tạm biệt",
    responses: [
      "Goodbye! Have a wonderful day! 🌟",
      "See you later! Take care! 💖",
      "Bye! Come back anytime! ✨",
    ],
  },
];

const fallbackResponses = [
  "That's interesting! Could you tell me more?",
  "I see. How can I help you with that?",
  "Thanks for sharing! What else would you like to know?",
  "I'm here to help! What would you like to explore?",
  "That sounds great! Tell me more about it.",
];

export const getAIResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Check for matching keywords
  for (const mock of mockResponses) {
    const keywords = mock.keyword.split("|");
    const hasMatch = keywords.some((keyword) => lowerMessage.includes(keyword));

    if (hasMatch) {
      const responses = mock.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Check for specific patterns
  if (lowerMessage.includes("?")) {
    return "Great question! Let me help you with that. Could you provide more details?";
  }

  if (lowerMessage.length < 5) {
    return "I'd love to help! Could you provide a bit more detail?";
  }

  // Fallback
  return fallbackResponses[
    Math.floor(Math.random() * fallbackResponses.length)
  ];
};
