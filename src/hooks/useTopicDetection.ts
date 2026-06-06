import { detectTopic, Topic } from '@/utils/topic.detector';
import { useState, useCallback } from 'react';

export function useTopicDetection() {
  const [currentTopic, setCurrentTopic] = useState<Topic>('identity');

  const analyze = useCallback((question: string) => {
    const topic = detectTopic(question);
    setCurrentTopic(topic);
    return topic;
  }, []);

  return { currentTopic, analyze };
}