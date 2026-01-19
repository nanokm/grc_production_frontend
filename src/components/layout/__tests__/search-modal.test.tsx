import { render, screen, fireEvent, waitFor } from "@/tests/test-utils"
import { SearchModal, filterSearchResults } from "../search-modal"

describe("SearchModal", () => {
  const mockOnOpenChange = jest.fn()

  beforeEach(() => {
    mockOnOpenChange.mockClear()
  })

  it("renders when open", () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByPlaceholderText("Search pages, actions, and more...")).toBeInTheDocument()
  })

  it("does not render content when closed", () => {
    render(<SearchModal open={false} onOpenChange={mockOnOpenChange} />)
    expect(screen.queryByPlaceholderText("Search pages, actions, and more...")).not.toBeInTheDocument()
  })

  it("shows recent searches by default", () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByText("Recent Searches")).toBeInTheDocument()
    expect(screen.getByText("Risk Assessment")).toBeInTheDocument()
    expect(screen.getByText("Compliance Reports")).toBeInTheDocument()
  })

  it("filters results when typing", async () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    const input = screen.getByPlaceholderText("Search pages, actions, and more...")

    fireEvent.change(input, { target: { value: "risk" } })

    await waitFor(() => {
      expect(screen.getByText("Risk Assessment")).toBeInTheDocument()
      expect(screen.getByText("Risk Register")).toBeInTheDocument()
    })
  })

  it("shows empty state when no results found", async () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    const input = screen.getByPlaceholderText("Search pages, actions, and more...")

    fireEvent.change(input, { target: { value: "xyznonexistent" } })

    await waitFor(() => {
      expect(screen.getByText(/No results found/)).toBeInTheDocument()
    })
  })

  it("shows keyboard navigation hints", () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByText("Navigate")).toBeInTheDocument()
    expect(screen.getByText("Select")).toBeInTheDocument()
    expect(screen.getByText("Close")).toBeInTheDocument()
  })

  it("closes when close button is clicked", () => {
    render(<SearchModal open={true} onOpenChange={mockOnOpenChange} />)
    const closeButton = screen.getByLabelText("Close")

    fireEvent.click(closeButton)

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })
})

describe("filterSearchResults", () => {
  const recentSearches = [
    { id: "1", title: "Risk Assessment", type: "recent" as const, description: "View risks" },
    { id: "2", title: "Compliance", type: "recent" as const, description: "Check compliance" },
  ]

  const pages = [
    { id: "3", title: "Dashboard", type: "page" as const, description: "Main dashboard" },
    { id: "4", title: "Risk Register", type: "page" as const, description: "All risks" },
  ]

  it("returns all recent searches when query is empty", () => {
    const result = filterSearchResults("", recentSearches, pages)
    expect(result.recent).toHaveLength(2)
    expect(result.pages).toHaveLength(0)
  })

  it("filters by title", () => {
    const result = filterSearchResults("risk", recentSearches, pages)
    expect(result.recent).toHaveLength(1)
    expect(result.pages).toHaveLength(1)
  })

  it("filters by description", () => {
    const result = filterSearchResults("dashboard", recentSearches, pages)
    expect(result.pages).toHaveLength(1)
    expect(result.pages[0].title).toBe("Dashboard")
  })

  it("is case insensitive", () => {
    const result = filterSearchResults("RISK", recentSearches, pages)
    expect(result.recent).toHaveLength(1)
    expect(result.pages).toHaveLength(1)
  })

  it("trims whitespace from query", () => {
    const result = filterSearchResults("  risk  ", recentSearches, pages)
    expect(result.recent).toHaveLength(1)
  })
})
