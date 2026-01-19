import { render, screen, fireEvent, waitFor } from "@/tests/test-utils"
import LoginPage from "../page"

// Mock next/navigation
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    document.cookie = "grc_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
  })

  it("should render login form", () => {
    render(<LoginPage />)

    expect(screen.getByRole("heading", { name: /log in to your account/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("should show error for invalid credentials", async () => {
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "wrong" } })
    fireEvent.change(passwordInput, { target: { value: "wrong" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })

    expect(mockPush).not.toHaveBeenCalled()
  })

  it("should redirect on successful login", async () => {
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "admin" } })
    fireEvent.change(passwordInput, { target: { value: "admin" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/")
    })
  })

  it("should show loading state during login", async () => {
    render(<LoginPage />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "admin" } })
    fireEvent.change(passwordInput, { target: { value: "admin" } })
    fireEvent.click(submitButton)

    // Button should show loading state
    await waitFor(() => {
      expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    })

    // Wait for login to complete
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled()
    })
  })

  it("should have forgot password link", () => {
    render(<LoginPage />)

    expect(screen.getByRole("link", { name: /forgot password/i })).toBeInTheDocument()
  })
})
