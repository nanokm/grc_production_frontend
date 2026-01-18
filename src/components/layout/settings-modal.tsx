"use client"

import {
  Dialog,
  Portal,
  Box,
  Text,
  CloseButton,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react"
import { LuSettings, LuPalette, LuBell, LuShield, LuGlobe } from "react-icons/lu"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SettingsCategory {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: "appearance",
    icon: <LuPalette />,
    title: "Appearance",
    description: "Customize theme and display settings",
  },
  {
    id: "notifications",
    icon: <LuBell />,
    title: "Notifications",
    description: "Manage notification preferences",
  },
  {
    id: "security",
    icon: <LuShield />,
    title: "Security",
    description: "Two-factor authentication and sessions",
  },
  {
    id: "language",
    icon: <LuGlobe />,
    title: "Language & Region",
    description: "Set language and regional preferences",
  },
]

/**
 * Settings modal component showing available settings categories.
 * Currently displays placeholder content for future implementation.
 */
export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps): React.ReactElement => {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header borderBottomWidth="1px" pb="4">
              <HStack gap="2">
                <LuSettings />
                <Dialog.Title>Settings</Dialog.Title>
              </HStack>
            </Dialog.Header>

            <Dialog.Body py="6">
              <VStack gap="2" align="stretch">
                {SETTINGS_CATEGORIES.map((category) => (
                  <HStack
                    key={category.id}
                    p="4"
                    rounded="md"
                    cursor="pointer"
                    _hover={{ bg: "bg.muted" }}
                    borderWidth="1px"
                    justify="space-between"
                  >
                    <HStack gap="4">
                      <Box
                        p="2"
                        rounded="md"
                        bg="bg.muted"
                        color="fg.muted"
                      >
                        {category.icon}
                      </Box>
                      <Box>
                        <Text fontWeight="medium">{category.title}</Text>
                        <Text fontSize="sm" color="fg.muted">
                          {category.description}
                        </Text>
                      </Box>
                    </HStack>
                  </HStack>
                ))}
              </VStack>

              <Box mt="6" p="4" bg="bg.muted" rounded="md">
                <Text fontSize="sm" color="fg.muted" textAlign="center">
                  Settings functionality will be implemented in future updates.
                </Text>
              </Box>
            </Dialog.Body>

            <Dialog.Footer borderTopWidth="1px" pt="4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild position="absolute" top="3" right="3">
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
