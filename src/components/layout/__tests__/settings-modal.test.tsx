import { render, screen, fireEvent } from "@/tests/test-utils"
import { SettingsModal } from "../settings-modal"

describe("SettingsModal", () => {
  const mockOnOpenChange = jest.fn()

  beforeEach(() => {
    mockOnOpenChange.mockClear()
  })

  it("renders when open", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByRole("dialog")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<SettingsModal open={false} onOpenChange={mockOnOpenChange} />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("displays settings title", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })

  it("displays all settings categories", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)

    expect(screen.getByText("Appearance")).toBeInTheDocument()
    expect(screen.getByText("Notifications")).toBeInTheDocument()
    expect(screen.getByText("Security")).toBeInTheDocument()
    expect(screen.getByText("Language & Region")).toBeInTheDocument()
  })

  it("displays category descriptions", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)

    expect(screen.getByText("Customize theme and display settings")).toBeInTheDocument()
    expect(screen.getByText("Manage notification preferences")).toBeInTheDocument()
    expect(screen.getByText("Two-factor authentication and sessions")).toBeInTheDocument()
    expect(screen.getByText("Set language and regional preferences")).toBeInTheDocument()
  })

  it("displays placeholder message", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(
      screen.getByText("Settings functionality will be implemented in future updates.")
    ).toBeInTheDocument()
  })

  it("closes when close button in footer is clicked", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)
    // Get the footer close button specifically (not the X button)
    const closeButtons = screen.getAllByRole("button", { name: "Close" })
    // The footer button is the text "Close" button, filter by checking for text content
    const footerCloseButton = closeButtons.find((btn) => btn.textContent === "Close")

    fireEvent.click(footerCloseButton!)

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it("has a close trigger button", () => {
    render(<SettingsModal open={true} onOpenChange={mockOnOpenChange} />)
    expect(screen.getByLabelText("Close")).toBeInTheDocument()
  })
})
