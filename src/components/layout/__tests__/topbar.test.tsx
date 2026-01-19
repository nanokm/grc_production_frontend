import { render, screen, fireEvent, waitFor } from "@/tests/test-utils"
import { Topbar } from "../topbar"

describe("Topbar", () => {
  it("renders the GRC logo", () => {
    render(<Topbar />)
    expect(screen.getByText("GRC")).toBeInTheDocument()
  })

  it("renders the search input", () => {
    render(<Topbar />)
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
  })

  it("renders keyboard shortcut indicators", () => {
    render(<Topbar />)
    expect(screen.getByText("⌘")).toBeInTheDocument()
    expect(screen.getByText("K")).toBeInTheDocument()
  })

  it("opens search modal when search input is clicked", async () => {
    render(<Topbar />)
    const searchInput = screen.getByPlaceholderText("Search...")
    fireEvent.click(searchInput)

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search pages, actions, and more...")).toBeInTheDocument()
    })
  })

  it("renders notification button", () => {
    render(<Topbar />)
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument()
  })

  it("renders settings button", () => {
    render(<Topbar />)
    expect(screen.getByLabelText("Settings")).toBeInTheDocument()
  })

  it("opens settings modal when settings button is clicked", async () => {
    render(<Topbar />)
    const settingsButton = screen.getByLabelText("Settings")
    fireEvent.click(settingsButton)

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument()
    })
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("renders user avatar", () => {
    render(<Topbar />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })
})
