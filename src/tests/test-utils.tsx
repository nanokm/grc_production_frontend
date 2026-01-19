import { ReactElement, ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { AuthProvider } from "@/hooks/use-auth"

/**
 * Custom wrapper that provides Chakra UI and Auth context for testing.
 */
const AllProviders = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  )
}

/**
 * Wrapper with only Chakra UI context (no auth).
 */
const ChakraOnlyProvider = ({ children }: { children: ReactNode }): ReactElement => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}

/**
 * Custom render function that wraps components with all providers.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { withAuth?: boolean }
): ReturnType<typeof render> => {
  const { withAuth = true, ...renderOptions } = options || {}
  const wrapper = withAuth ? AllProviders : ChakraOnlyProvider
  return render(ui, { wrapper, ...renderOptions })
}

export * from "@testing-library/react"
export { customRender as render }
