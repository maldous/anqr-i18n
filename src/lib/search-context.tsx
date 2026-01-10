import { createContext, type ReactNode, useContext, useMemo } from 'react';

interface SearchContextValue {
  searchQuery: string;
}

const SearchContext = createContext<SearchContextValue>({ searchQuery: '' });

export function SearchProvider({
  children,
  searchQuery,
}: Readonly<{
  children: ReactNode;
  searchQuery: string;
}>) {
  const value = useMemo(() => ({ searchQuery }), [searchQuery]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  return useContext(SearchContext);
}

export function highlightText(text: string, searchQuery: string): ReactNode {
  if (!searchQuery || searchQuery.length < 2) {
    return text;
  }

  const query = searchQuery.toLowerCase();
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query);

  if (index === -1) {
    return text;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded px-0.5">
        {match}
      </span>
      {highlightText(after, searchQuery)}
    </>
  );
}

export function HighlightedLabel({ children }: Readonly<{ children: string }>) {
  const { searchQuery } = useSearch();
  return <>{highlightText(children, searchQuery)}</>;
}
