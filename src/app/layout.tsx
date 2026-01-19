import type { Metadata } from "next"
import { Provider } from "@/components/ui/provider"
import { AppProvider } from "@/components/providers/app-provider"
import { AuthProvider } from "@/hooks/use-auth"

export const metadata: Metadata = {
  title: "GRC Platform",
  description: "Governance, Risk, and Compliance Platform",
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AuthProvider>
            <AppProvider>{children}</AppProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
