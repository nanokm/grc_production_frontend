import { ReactElement, ReactNode } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

/**
 * Custom wrapper that provides Chakra UI context for testing.
 */
const AllProviders = ({ children }: { children: ReactNode }): ReactElement => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}

/**
 * Custom render function that wraps components with necessary providers.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): ReturnType<typeof render> => render(ui, { wrapper: AllProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
