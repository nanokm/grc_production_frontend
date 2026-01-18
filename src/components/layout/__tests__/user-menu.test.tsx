import { render, screen, fireEvent } from "@/tests/test-utils"
import { UserMenu } from "../user-menu"

// Mock the color mode hook
const mockToggleColorMode = jest.fn()
let mockColorMode = "light"

jest.mock("@/components/ui/color-mode", () => ({
  useColorMode: () => ({
    colorMode: mockColorMode,
    toggleColorMode: mockToggleColorMode,
    setColorMode: jest.fn(),
  }),
}))

describe("UserMenu", () => {
  const mockOnSettingsClick = jest.fn()

  beforeEach(() => {
    mockOnSettingsClick.mockClear()
    mockToggleColorMode.mockClear()
    mockColorMode = "light"
  })

  it("renders user avatar with initials", () => {
    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("renders custom user name initials", () => {
    render(
      <UserMenu
        onSettingsClick={mockOnSettingsClick}
        userName="Alice Smith"
      />
    )
    expect(screen.getByText("AS")).toBeInTheDocument()
  })

  it("opens menu when avatar is clicked", async () => {
    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    const avatar = screen.getByText("JD")

    fireEvent.click(avatar)

    expect(await screen.findByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument()
  })

  it("displays menu items", async () => {
    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    fireEvent.click(screen.getByText("JD"))

    expect(await screen.findByText("My Profile")).toBeInTheDocument()
    expect(screen.getByText("Account Settings")).toBeInTheDocument()
    expect(screen.getByText("Help & Support")).toBeInTheDocument()
  })

  it("displays sign out option", async () => {
    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    fireEvent.click(screen.getByText("JD"))

    expect(await screen.findByText("Sign Out")).toBeInTheDocument()
  })

  it("calls onSettingsClick when account settings is clicked", async () => {
    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    fireEvent.click(screen.getByText("JD"))

    const settingsOption = await screen.findByText("Account Settings")
    fireEvent.click(settingsOption)

    expect(mockOnSettingsClick).toHaveBeenCalled()
  })

  it("logs logout action when sign out is clicked", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation()

    render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
    fireEvent.click(screen.getByText("JD"))

    const signOutOption = await screen.findByText("Sign Out")
    fireEvent.click(signOutOption)

    expect(consoleSpy).toHaveBeenCalledWith("Logout clicked")
    consoleSpy.mockRestore()
  })

  it("uses custom user email", async () => {
    render(
      <UserMenu
        onSettingsClick={mockOnSettingsClick}
        userName="Test User"
        userEmail="test@test.com"
      />
    )
    fireEvent.click(screen.getByText("TU"))

    expect(await screen.findByText("test@test.com")).toBeInTheDocument()
  })

  describe("Theme Toggle", () => {
    it("displays Dark Mode option when in light mode", async () => {
      mockColorMode = "light"
      render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
      fireEvent.click(screen.getByText("JD"))

      expect(await screen.findByText("Dark Mode")).toBeInTheDocument()
    })

    it("displays Light Mode option when in dark mode", async () => {
      mockColorMode = "dark"
      render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
      fireEvent.click(screen.getByText("JD"))

      expect(await screen.findByText("Light Mode")).toBeInTheDocument()
    })

    it("calls toggleColorMode when theme option is clicked", async () => {
      render(<UserMenu onSettingsClick={mockOnSettingsClick} />)
      fireEvent.click(screen.getByText("JD"))

      const themeOption = await screen.findByText("Dark Mode")
      fireEvent.click(themeOption)

      expect(mockToggleColorMode).toHaveBeenCalled()
    })
  })
})
