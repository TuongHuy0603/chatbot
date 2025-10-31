'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import LeftSidebar from '@/components/LeftSidebar';
import MobileSidebarSheet from '@/components/MobileSidebarSheet';
import Dashboard from '@/components/Dashboard';
import { useSendMessageMutation } from '@/features/chat/queries';

export default function Home() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const sendMessageMutation = useSendMessageMutation();
  const [isThinking, setIsThinking] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}`);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  });

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handler = () => setIsSidebarOpen(true);
    window.addEventListener('open-mobile-sidebar', handler);
    return () => window.removeEventListener('open-mobile-sidebar', handler);
  }, []);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpen]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    const normalized = (messageText || '').trim().toLowerCase();
    if (normalized.includes('wanpachi')) {
      const aiResponse = {
        text: '',
        image: '/images/wanpachi.png',
        sender: 'ai',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) input.focus();
      }, 100);
      return;
    }

    try {
      const data = await sendMessageMutation.mutateAsync({
        conversationId,
        message: messageText,
      });

      const aiResponse = {
        text:
          data.answer ||
          data.response ||
          data.message ||
          'Xin lỗi, tôi không thể trả lời lúc này.',
        sender: 'ai',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);

      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) {
          input.focus();
        }
      }, 100);
    } catch (error) {
      console.error('Error calling API:', error);
      setIsThinking(false);

      setTimeout(() => {
        const input = document.getElementById('chat-input');
        if (input) {
          input.focus();
        }
      }, 100);
    }
  };

  return (
    <div
      className="flex flex-row w-full lg:h-screen min-h-screen transition-all duration-500 lg:overflow-hidden overflow-y-auto"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
        background: theme.gradient,
        backgroundSize: theme.gradientSize,
      }}
    >
      <LeftSidebar
        isOpen={!isMobile && isSidebarOpen}
        onToggle={() => setIsSidebarOpen((v) => !v)}
      />
      <div className="flex flex-col overflow-hidden flex-1 lg:px-24 px-4 container-color">
        <Dashboard
          messages={messages}
          handleSendMessage={handleSendMessage}
          isThinking={isThinking}
        />
      </div>
      {isMobile && (
        <MobileSidebarSheet
          open={isSidebarOpen}
          onOpenChange={(v) => setIsSidebarOpen(v)}
        />
      )}
    </div>
  );
}


