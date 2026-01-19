"use client"

import { Box, Container, Heading, Text, VStack, HStack, Card, SimpleGrid, Input, Button, Field } from "@chakra-ui/react"
import { Topbar } from "@/components/layout/topbar"

/**
 * Main dashboard page component.
 * Displays the topbar and mock content.
 */
const HomePage = (): React.ReactElement => {
  return (
    <Box minH="100vh" bg="bg.subtle">
      <Topbar />

      <Container maxW="container.xl" py="8">
        <VStack gap="8" align="stretch">
          {/* Page Header */}
          <Box>
            <Heading size="lg" mb="2">
              Welcome to GRC Platform
            </Heading>
            <Text color="fg.muted">
              Manage governance, risk, and compliance in one place.
            </Text>
          </Box>

          {/* Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4">
            <Card.Root>
              <Card.Body>
                <VStack align="flex-start" gap="1">
                  <Text fontSize="sm" color="fg.muted">
                    Total Risks
                  </Text>
                  <Heading size="2xl">42</Heading>
                  <Text fontSize="sm" color="green.500">
                    +12% from last month
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="flex-start" gap="1">
                  <Text fontSize="sm" color="fg.muted">
                    Active Controls
                  </Text>
                  <Heading size="2xl">156</Heading>
                  <Text fontSize="sm" color="green.500">
                    +5% from last month
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="flex-start" gap="1">
                  <Text fontSize="sm" color="fg.muted">
                    Compliance Score
                  </Text>
                  <Heading size="2xl">87%</Heading>
                  <Text fontSize="sm" color="green.500">
                    +3% from last month
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <VStack align="flex-start" gap="1">
                  <Text fontSize="sm" color="fg.muted">
                    Open Issues
                  </Text>
                  <Heading size="2xl">8</Heading>
                  <Text fontSize="sm" color="red.500">
                    -2 from last month
                  </Text>
                </VStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>

          {/* Mock Form Section */}
          <Card.Root>
            <Card.Header>
              <Heading size="md">Quick Risk Assessment</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap="4" align="stretch" maxW="md">
                <Field.Root>
                  <Field.Label>Risk Title</Field.Label>
                  <Input placeholder="Enter risk title" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input placeholder="Describe the risk" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Impact Level</Field.Label>
                  <Input placeholder="Low / Medium / High / Critical" />
                </Field.Root>

                <HStack gap="2" pt="2">
                  <Button colorPalette="blue">Submit Assessment</Button>
                  <Button variant="outline">Cancel</Button>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Recent Activity */}
          <Card.Root>
            <Card.Header>
              <Heading size="md">Recent Activity</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap="4" align="stretch">
                {[
                  {
                    action: "Risk assessment submitted",
                    user: "John Doe",
                    time: "2 hours ago",
                  },
                  {
                    action: "Control updated",
                    user: "Jane Smith",
                    time: "4 hours ago",
                  },
                  {
                    action: "Compliance report generated",
                    user: "Mike Johnson",
                    time: "6 hours ago",
                  },
                  {
                    action: "New policy approved",
                    user: "Sarah Williams",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <HStack
                    key={index}
                    justify="space-between"
                    py="2"
                    borderBottomWidth={index < 3 ? "1px" : "0"}
                  >
                    <Box>
                      <Text fontWeight="medium">{activity.action}</Text>
                      <Text fontSize="sm" color="fg.muted">
                        by {activity.user}
                      </Text>
                    </Box>
                    <Text fontSize="sm" color="fg.muted">
                      {activity.time}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  )
}

export default HomePage
