import { useState, useRef, useEffect } from 'react';

export const useChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 김민준 지원자의 포트폴리오 에이전트입니다. 어떤 기술적 고민을 함께 나누고 싶으신가요?' }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  const getMockResponse = (question: string) => {
    if (question.includes('Rodia')) return 'Rodia 프로젝트에서는 파편화된 상태를 공통 상태 머신으로 통합하여 뷰 렌더링 분기 로직을 약 60% 축소했습니다.';
    if (question.includes('StoryLex') || question.includes('401')) return 'StoryLex에서는 다중 401 에러 시 토큰 갱신 요청 중복을 차단하기 위해 Axios Interceptor 큐를 설계했습니다.';
    if (question.includes('예외') || question.includes('관련 없는')) return '현재 포트폴리오 도메인 외의 질문입니다.';
    return `"${question}"에 대한 내용은 데이터베이스에 없습니다.`;
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    if (!isExpanded) setIsExpanded(true);
    
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getMockResponse(text) }]);
      setIsTyping(false);
    }, 1200);
  };

  return { 
    isExpanded, setIsExpanded, 
    isFullScreen, setIsFullScreen, 
    inputValue, setInputValue, 
    isTyping, messages, 
    handleSend, scrollRef, inputRef 
  };
};