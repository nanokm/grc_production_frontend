import { renderHook, act, waitFor } from "@testing-library/react"
import { ReactNode } from "react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { AuthProvider, useAuth } from "../use-auth"

const wrapper = ({ children }: { children: ReactNode }) => (
  <ChakraProvider value={defaultSystem}>
    <AuthProvider>{children}</AuthProvider>
  </ChakraProvider>
)

describe("useAuth", () => {
  beforeEach(() => {
    localStorage.clear()
    document.cookie = "grc_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
  })

  it("should throw error when used outside AuthProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() => {
      renderHook(() => useAuth())
    }).toThrow("useAuth must be used within an AuthProvider")

    consoleSpy.mockRestore()
  })

  it("should initialize with no user and loading state", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it("should login successfully with valid credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    let loginResult: boolean = false
    await act(async () => {
      loginResult = await result.current.login("admin", "admin")
    })

    expect(loginResult).toBe(true)
    expect(result.current.user).toEqual({
      email: "admin",
      name: "Administrator",
    })
    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorage.getItem("grc_auth_user")).toBeTruthy()
  })

  it("should fail login with invalid credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    let loginResult: boolean = false
    await act(async () => {
      loginResult = await result.current.login("wrong", "wrong")
    })

    expect(loginResult).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it("should logout successfully", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      await result.current.login("admin", "admin")
    })

    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem("grc_auth_user")).toBeNull()
  })

  it("should restore user from localStorage on mount", async () => {
    const userData = { email: "admin", name: "Administrator" }
    localStorage.setItem("grc_auth_user", JSON.stringify(userData))

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toEqual(userData)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it("should handle corrupted localStorage data", async () => {
    localStorage.setItem("grc_auth_user", "invalid-json")

    const { result } = renderHook(() => useAuth(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem("grc_auth_user")).toBeNull()
  })
})
