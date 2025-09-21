

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';



interface MultiSelectTagsInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
}

const MultiSelectTagsInput: React.FC<MultiSelectTagsInputProps> = ({ value, onChange }) => {
  const [tags, setTags] = useState<string[]>(value ?? []);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with parent value
  useEffect(() => {
    if (value !== undefined) {
      setTags(value);
    }
  }, [value]);

  // Notify parent on change
  useEffect(() => {
    if (onChange) {
      onChange(tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
  };

  const addTag = (tagValue: string) => {
    const trimmedTag = tagValue.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Features</label>
        
        <div 
          className="min-h-[40px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white cursor-text flex flex-wrap items-center gap-1"
          onClick={focusInput}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded border"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className="hover:bg-gray-200 rounded p-0.5 transition-colors ml-1"
                type="button"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </span>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none bg-transparent text-sm placeholder-gray-400 w-full"
            placeholder={tags.length === 0 ? "Type and press Enter to add features..." : ""}
          />
        </div>

      </div>
    </div>
  );
};

export default MultiSelectTagsInput;