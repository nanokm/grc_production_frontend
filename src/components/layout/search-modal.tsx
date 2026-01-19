"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Dialog,
  Portal,
  Input,
  Box,
  Text,
  Kbd,
  HStack,
  VStack,
  CloseButton,
  InputGroup,
} from "@chakra-ui/react"
import { LuSearch, LuFile, LuClock, LuArrowRight } from "react-icons/lu"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  id: string
  title: string
  type: "recent" | "page" | "action"
  description?: string
}

const MOCK_RECENT_SEARCHES: SearchResult[] = [
  { id: "1", title: "Risk Assessment", type: "recent", description: "View risk assessments" },
  { id: "2", title: "Compliance Reports", type: "recent", description: "Generate reports" },
  { id: "3", title: "User Management", type: "recent", description: "Manage users" },
]

const MOCK_PAGES: SearchResult[] = [
  { id: "4", title: "Dashboard", type: "page", description: "Main dashboard view" },
  { id: "5", title: "Risk Register", type: "page", description: "All registered risks" },
  { id: "6", title: "Controls Library", type: "page", description: "Security controls" },
  { id: "7", title: "Audit Logs", type: "page", description: "System audit trails" },
]

/**
 * Filters search results based on query string.
 * Returns matching results from both recent and page searches.
 */
export const filterSearchResults = (
  query: string,
  recentSearches: SearchResult[],
  pages: SearchResult[]
): { recent: SearchResult[]; pages: SearchResult[] } => {
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) {
    return { recent: recentSearches, pages: [] }
  }

  const filterFn = (item: SearchResult): boolean =>
    item.title.toLowerCase().includes(normalizedQuery) ||
    (item.description?.toLowerCase().includes(normalizedQuery) ?? false)

  return {
    recent: recentSearches.filter(filterFn),
    pages: pages.filter(filterFn),
  }
}

/**
 * Search modal component with keyboard shortcut support (⌘K / Ctrl+K).
 * Displays recent searches and filtered results.
 */
export const SearchModal = ({ open, onOpenChange }: SearchModalProps): React.ReactElement => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ recent: SearchResult[]; pages: SearchResult[] }>({
    recent: MOCK_RECENT_SEARCHES,
    pages: [],
  })

  const handleSearch = useCallback((value: string): void => {
    setQuery(value)
    const filtered = filterSearchResults(value, MOCK_RECENT_SEARCHES, MOCK_PAGES)
    setResults(filtered)
  }, [])

  const handleClose = useCallback((): void => {
    onOpenChange(false)
    setQuery("")
    setResults({ recent: MOCK_RECENT_SEARCHES, pages: [] })
  }, [onOpenChange])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  const ResultIcon = ({ type }: { type: SearchResult["type"] }): React.ReactElement => {
    if (type === "recent") return <LuClock size={16} />
    return <LuFile size={16} />
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="top"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner paddingTop="20">
          <Dialog.Content maxW="600px" w="full">
            <Box p="4">
              <InputGroup startElement={<LuSearch />}>
                <Input
                  placeholder="Search pages, actions, and more..."
                  size="lg"
                  variant="outline"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
              </InputGroup>
            </Box>

            <Box maxH="400px" overflowY="auto" px="2" pb="2">
              {results.recent.length > 0 && (
                <Box mb="4">
                  <Text fontSize="xs" fontWeight="medium" color="fg.muted" px="2" mb="2">
                    {query ? "Matching Recent" : "Recent Searches"}
                  </Text>
                  <VStack gap="1" align="stretch">
                    {results.recent.map((result) => (
                      <HStack
                        key={result.id}
                        px="3"
                        py="2"
                        rounded="md"
                        cursor="pointer"
                        _hover={{ bg: "bg.muted" }}
                        justify="space-between"
                      >
                        <HStack gap="3">
                          <Box color="fg.muted">
                            <ResultIcon type={result.type} />
                          </Box>
                          <Box>
                            <Text fontWeight="medium">{result.title}</Text>
                            {result.description && (
                              <Text fontSize="sm" color="fg.muted">
                                {result.description}
                              </Text>
                            )}
                          </Box>
                        </HStack>
                        <Box color="fg.muted">
                          <LuArrowRight size={14} />
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}

              {results.pages.length > 0 && (
                <Box>
                  <Text fontSize="xs" fontWeight="medium" color="fg.muted" px="2" mb="2">
                    Pages
                  </Text>
                  <VStack gap="1" align="stretch">
                    {results.pages.map((result) => (
                      <HStack
                        key={result.id}
                        px="3"
                        py="2"
                        rounded="md"
                        cursor="pointer"
                        _hover={{ bg: "bg.muted" }}
                        justify="space-between"
                      >
                        <HStack gap="3">
                          <Box color="fg.muted">
                            <ResultIcon type={result.type} />
                          </Box>
                          <Box>
                            <Text fontWeight="medium">{result.title}</Text>
                            {result.description && (
                              <Text fontSize="sm" color="fg.muted">
                                {result.description}
                              </Text>
                            )}
                          </Box>
                        </HStack>
                        <Box color="fg.muted">
                          <LuArrowRight size={14} />
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}

              {query && results.recent.length === 0 && results.pages.length === 0 && (
                <Box textAlign="center" py="8">
                  <Text color="fg.muted">No results found for &quot;{query}&quot;</Text>
                </Box>
              )}
            </Box>

            <Box borderTopWidth="1px" px="4" py="3">
              <HStack justify="space-between" fontSize="xs" color="fg.muted">
                <HStack gap="4">
                  <HStack gap="1">
                    <Kbd size="sm">↑</Kbd>
                    <Kbd size="sm">↓</Kbd>
                    <Text>Navigate</Text>
                  </HStack>
                  <HStack gap="1">
                    <Kbd size="sm">↵</Kbd>
                    <Text>Select</Text>
                  </HStack>
                </HStack>
                <HStack gap="1">
                  <Kbd size="sm">Esc</Kbd>
                  <Text>Close</Text>
                </HStack>
              </HStack>
            </Box>

            <Dialog.CloseTrigger asChild position="absolute" top="3" right="3">
              <CloseButton size="sm" onClick={handleClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
