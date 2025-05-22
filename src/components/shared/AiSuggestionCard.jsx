/*'use client';
import React, { useState } from 'react';
import { callGemini } from '@/app/utils/geminiApi';

export default function AiSuggestionCard({ field, onInsert }) {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    const text = await callGemini(field);
    setSuggestion(text);
    setLoading(false);
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded">
      <button
        onClick={fetchSuggestion}
        className="mb-2 px-3 py-1 bg-teal-600 text-white rounded"
      >
        {loading ? 'Loading...' : 'Get AI Suggestion'}
      </button>
      {suggestion && (
        <div>
          <p className="mb-2 whitespace-pre-wrap">{suggestion}</p>
          <button
            onClick={() => onInsert(suggestion)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Insert
          </button>
        </div>
      )}
    </div>
  );
}
  */