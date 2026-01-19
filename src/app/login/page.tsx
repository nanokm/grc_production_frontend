"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Container,
  Field,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { useAuth } from "@/hooks/use-auth"

const LoginPage = (): React.ReactElement => {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="bg.subtle">
      <Container maxW="md" py={{ base: "12", md: "24" }}>
        <Stack gap="8">
          <Stack gap="6" textAlign="center">
            <Stack gap="3">
              <Heading size="2xl" fontWeight="semibold">
                Log in to your account
              </Heading>
              <Text color="fg.muted">
                Enter your credentials to access the platform
              </Text>
            </Stack>
          </Stack>

          <Box
            py={{ base: "8", sm: "10" }}
            px={{ base: "6", sm: "10" }}
            bg="bg"
            boxShadow="md"
            borderRadius="xl"
          >
            <form onSubmit={handleSubmit}>
              <Stack gap="6">
                <Stack gap="5">
                  <Field.Root required>
                    <Field.Label>Email</Field.Label>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="username"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </Field.Root>
                </Stack>

                {error && (
                  <Text color="red.500" fontSize="sm" textAlign="center">
                    {error}
                  </Text>
                )}

                <Stack gap="4">
                  <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    width="full"
                    loading={isLoading}
                    loadingText="Signing in..."
                  >
                    Sign in
                  </Button>
                </Stack>

                <Text textAlign="center" fontSize="sm" color="fg.muted">
                  <Link href="#" colorPalette="blue">
                    Forgot password?
                  </Link>
                </Text>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default LoginPage
