"use client"

import { useState, useCallback } from "react"
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Input,
  Kbd,
  InputGroup,
} from "@chakra-ui/react"
import { LuSearch, LuSettings } from "react-icons/lu"
import { SearchModal } from "./search-modal"
import { NotificationsPopover } from "./notifications-popover"
import { SettingsModal } from "./settings-modal"
import { UserMenu } from "./user-menu"

/**
 * Main topbar/navbar component for the application.
 * Contains logo, centered search bar, and right-side action icons.
 */
export const Topbar = (): React.ReactElement => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleSearchOpen = useCallback((): void => {
    setSearchOpen(true)
  }, [])

  const handleSearchClose = useCallback((open: boolean): void => {
    setSearchOpen(open)
  }, [])

  const handleSettingsOpen = useCallback((): void => {
    setSettingsOpen(true)
  }, [])

  const handleSettingsClose = useCallback((open: boolean): void => {
    setSettingsOpen(open)
  }, [])

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="sticky"
        bg="bg"
        borderBottomWidth="1px"
      >
        <Flex
          h="16"
          align="center"
          justify="space-between"
          px="4"
          maxW="container.2xl"
          mx="auto"
        >
          {/* Left side - Logo */}
          <Box flexShrink={0}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              letterSpacing="tight"
              color="colorPalette.600"
            >
              GRC
            </Text>
          </Box>

          {/* Center - Search Bar */}
          <Box flex="1" maxW="480px" mx="8" display={{ base: "none", md: "block" }}>
            <InputGroup
              startElement={<LuSearch />}
              endElement={
                <HStack gap="1">
                  <Kbd size="sm">⌘</Kbd>
                  <Kbd size="sm">K</Kbd>
                </HStack>
              }
              w="full"
            >
              <Input
                placeholder="Search..."
                size="sm"
                variant="outline"
                rounded="lg"
                cursor="pointer"
                readOnly
                onClick={handleSearchOpen}
                _hover={{ borderColor: "border.emphasized" }}
              />
            </InputGroup>
          </Box>

          {/* Right side - Icons */}
          <HStack gap="1" flexShrink={0}>
            {/* Mobile search button */}
            <IconButton
              aria-label="Search"
              variant="ghost"
              size="sm"
              display={{ base: "flex", md: "none" }}
              onClick={handleSearchOpen}
            >
              <LuSearch />
            </IconButton>

            {/* Notifications */}
            <NotificationsPopover />

            {/* Settings */}
            <IconButton
              aria-label="Settings"
              variant="ghost"
              size="sm"
              onClick={handleSettingsOpen}
            >
              <LuSettings />
            </IconButton>

            {/* User Menu */}
            <UserMenu onSettingsClick={handleSettingsOpen} />
          </HStack>
        </Flex>
      </Box>

      {/* Modals */}
      <SearchModal open={searchOpen} onOpenChange={handleSearchClose} />
      <SettingsModal open={settingsOpen} onOpenChange={handleSettingsClose} />
    </>
  )
}
