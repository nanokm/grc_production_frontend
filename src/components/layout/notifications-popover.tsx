"use client"

import { useState } from "react"
import {
  Popover,
  Portal,
  Box,
  Text,
  IconButton,
  VStack,
  HStack,
  Tabs,
  Button,
  Badge,
  EmptyState,
  Avatar,
  Circle,
  Float,
} from "@chakra-ui/react"
import { LuBell, LuInbox, LuArchive, LuCheck, LuSettings } from "react-icons/lu"

type NotificationType = "info" | "warning" | "success" | "error"

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  timestamp: string
  avatar?: string
}

interface NotificationsPopoverProps {
  notifications?: Notification[]
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Risk Assessment",
    message: "A new risk assessment has been submitted for review.",
    type: "info",
    read: false,
    timestamp: "5 min ago",
  },
  {
    id: "2",
    title: "Compliance Alert",
    message: "SOC 2 compliance deadline approaching in 7 days.",
    type: "warning",
    read: false,
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    title: "Control Updated",
    message: "Access Control policy has been updated successfully.",
    type: "success",
    read: true,
    timestamp: "2 hours ago",
  },
]

/**
 * Filters notifications based on read status and returns counts.
 */
export const getNotificationCounts = (
  notifications: Notification[]
): { unread: number; all: number; archived: number } => {
  const unread = notifications.filter((n) => !n.read).length
  return {
    unread,
    all: notifications.length,
    archived: 0,
  }
}

/**
 * Returns badge color based on notification type.
 */
export const getNotificationColor = (type: NotificationType): string => {
  const colors: Record<NotificationType, string> = {
    info: "blue",
    warning: "orange",
    success: "green",
    error: "red",
  }
  return colors[type]
}

/**
 * Notifications popover component with tabs for inbox and archived items.
 * Shows unread count badge and empty state when no notifications.
 */
export const NotificationsPopover = ({
  notifications = MOCK_NOTIFICATIONS,
}: NotificationsPopoverProps): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<string>("inbox")
  const counts = getNotificationCounts(notifications)

  const inboxNotifications = notifications.filter((n) => !n.read || activeTab === "inbox")
  const archivedNotifications: Notification[] = []

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Box position="relative">
          <IconButton aria-label="Notifications" variant="ghost" size="sm">
            <LuBell />
          </IconButton>
          {counts.unread > 0 && (
            <Float placement="top-end" offsetX="1" offsetY="1">
              <Circle bg="red.500" size="18px" color="white" fontSize="xs" fontWeight="bold">
                {counts.unread}
              </Circle>
            </Float>
          )}
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="380px">
            <Box>
              <HStack justify="space-between" px="4" py="3" borderBottomWidth="1px">
                <Text fontWeight="semibold" fontSize="md">
                  Notifications
                </Text>
                <HStack gap="1">
                  <IconButton aria-label="Mark all as read" variant="ghost" size="xs">
                    <LuCheck />
                  </IconButton>
                  <IconButton aria-label="Notification settings" variant="ghost" size="xs">
                    <LuSettings />
                  </IconButton>
                </HStack>
              </HStack>

              <Tabs.Root
                value={activeTab}
                onValueChange={(e) => setActiveTab(e.value)}
                variant="line"
              >
                <Tabs.List px="4" pt="2">
                  <Tabs.Trigger value="inbox" flex="1">
                    <LuInbox />
                    Inbox
                    {counts.unread > 0 && (
                      <Badge ml="2" colorPalette="red" size="sm">
                        {counts.unread}
                      </Badge>
                    )}
                  </Tabs.Trigger>
                  <Tabs.Trigger value="archived" flex="1">
                    <LuArchive />
                    Archived
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="inbox" p="0">
                  {inboxNotifications.length > 0 ? (
                    <VStack gap="0" align="stretch" maxH="300px" overflowY="auto">
                      {inboxNotifications.map((notification) => (
                        <HStack
                          key={notification.id}
                          px="4"
                          py="3"
                          gap="3"
                          cursor="pointer"
                          _hover={{ bg: "bg.muted" }}
                          borderBottomWidth="1px"
                          align="flex-start"
                        >
                          <Avatar.Root size="sm" colorPalette={getNotificationColor(notification.type)}>
                            <Avatar.Fallback>
                              {notification.title.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Box flex="1" minW="0">
                            <HStack justify="space-between" mb="1">
                              <Text fontWeight="medium" fontSize="sm" truncate>
                                {notification.title}
                              </Text>
                              {!notification.read && (
                                <Circle bg="blue.500" size="8px" flexShrink={0} />
                              )}
                            </HStack>
                            <Text fontSize="sm" color="fg.muted" lineClamp={2}>
                              {notification.message}
                            </Text>
                            <Text fontSize="xs" color="fg.muted" mt="1">
                              {notification.timestamp}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  ) : (
                    <Box py="8">
                      <EmptyState.Root>
                        <EmptyState.Content>
                          <EmptyState.Indicator>
                            <LuInbox />
                          </EmptyState.Indicator>
                          <VStack textAlign="center">
                            <EmptyState.Title>No notifications</EmptyState.Title>
                            <EmptyState.Description>
                              You're all caught up! Check back later for updates.
                            </EmptyState.Description>
                          </VStack>
                        </EmptyState.Content>
                      </EmptyState.Root>
                    </Box>
                  )}
                </Tabs.Content>

                <Tabs.Content value="archived" p="0">
                  {archivedNotifications.length > 0 ? (
                    <VStack gap="0" align="stretch" maxH="300px" overflowY="auto">
                      {archivedNotifications.map((notification) => (
                        <HStack
                          key={notification.id}
                          px="4"
                          py="3"
                          gap="3"
                          cursor="pointer"
                          _hover={{ bg: "bg.muted" }}
                          borderBottomWidth="1px"
                        >
                          <Avatar.Root size="sm" colorPalette={getNotificationColor(notification.type)}>
                            <Avatar.Fallback>
                              {notification.title.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Box flex="1">
                            <Text fontWeight="medium" fontSize="sm">
                              {notification.title}
                            </Text>
                            <Text fontSize="sm" color="fg.muted" lineClamp={2}>
                              {notification.message}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  ) : (
                    <Box py="8">
                      <EmptyState.Root>
                        <EmptyState.Content>
                          <EmptyState.Indicator>
                            <LuArchive />
                          </EmptyState.Indicator>
                          <VStack textAlign="center">
                            <EmptyState.Title>No archived notifications</EmptyState.Title>
                            <EmptyState.Description>
                              Archived notifications will appear here.
                            </EmptyState.Description>
                          </VStack>
                        </EmptyState.Content>
                      </EmptyState.Root>
                    </Box>
                  )}
                </Tabs.Content>
              </Tabs.Root>

              <Box px="4" py="3" borderTopWidth="1px">
                <Button variant="ghost" size="sm" w="full">
                  View all notifications
                </Button>
              </Box>
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
