import type { Metadata } from "next"
import { Provider } from "@/components/ui/provider"
import { AppProvider } from "@/components/providers/app-provider"

export const metadata: Metadata = {
  title: "GRC Platform",
  description: "Governance, Risk, and Compliance Platform",
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AppProvider>{children}</AppProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
