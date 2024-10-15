import { Suggestion } from '@/lib/types';

interface Props {
  handleSuggestionClick: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
}

export default function SearchSuggestions({
  suggestions,
  handleSuggestionClick,
}: Props) {
  return (
    <ul className='border p-2 rounded-md bg-white absolute left-0 top-10 mt-1 z-40 w-full'>
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          onClick={() => handleSuggestionClick(suggestion)}
          className={`cursor-pointer hover:bg-gray-200 p-2 ${suggestion.selected ? 'bg-gray-200' : ''}`}
        >
          {suggestion.place_name}
        </li>
      ))}
    </ul>
  );
}
