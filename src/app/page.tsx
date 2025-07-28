'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopicInput from '@/components/TopicInput';
import Button from '@/components/Button';
import Image from 'next/image';

export default function Home() {
  const [topic, setTopic] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    router.push(`/quiz?topic=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.altKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="RecapLM Logo"
            width={64}
            height={64}
            className="w-32 h-32"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          What would you like to revise today?
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <TopicInput
            value={topic}
            onChange={setTopic}
            placeholder="e.g., photosynthesis, binary trees, World War II..."
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" label="Start" variant='primary' />
        </form>
        <footer className="text-center text-sm text-gray-500 mt-10 px-4 pb-6">
          RecapLM is an AI-powered tool and may occasionally generate incorrect or incomplete information.
        </footer>
      </div>
    </main>
  );
}
