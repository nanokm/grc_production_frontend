"use client"

import {
  Menu,
  Portal,
  Avatar,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react"
import { LuUser, LuSettings, LuCircleHelp, LuLogOut, LuSun, LuMoon } from "react-icons/lu"
import { useColorMode } from "@/components/ui/color-mode"

interface UserMenuProps {
  onSettingsClick: () => void
  userName?: string
  userEmail?: string
  userAvatar?: string
}

interface MenuItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
  danger?: boolean
}

/**
 * User menu component with account settings and logout options.
 * Displays user avatar with dropdown menu containing profile actions.
 */
export const UserMenu = ({
  onSettingsClick,
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar,
}: UserMenuProps): React.ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleLogout = (): void => {
    // Logout logic will be implemented
    console.log("Logout clicked")
  }

  const menuItems: MenuItem[] = [
    {
      id: "profile",
      icon: <LuUser />,
      label: "My Profile",
      onClick: () => console.log("Profile clicked"),
    },
    {
      id: "settings",
      icon: <LuSettings />,
      label: "Account Settings",
      onClick: onSettingsClick,
    },
    {
      id: "theme",
      icon: colorMode === "dark" ? <LuSun /> : <LuMoon />,
      label: colorMode === "dark" ? "Light Mode" : "Dark Mode",
      onClick: toggleColorMode,
    },
    {
      id: "help",
      icon: <LuCircleHelp />,
      label: "Help & Support",
      onClick: () => console.log("Help clicked"),
    },
  ]

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger rounded="full" focusRing="outside" cursor="pointer">
        <Avatar.Root size="sm">
          <Avatar.Fallback name={userName} />
          {userAvatar && <Avatar.Image src={userAvatar} />}
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="220px">
            <Box px="3" py="3" borderBottomWidth="1px">
              <HStack gap="3">
                <Avatar.Root size="md">
                  <Avatar.Fallback name={userName} />
                  {userAvatar && <Avatar.Image src={userAvatar} />}
                </Avatar.Root>
                <Box>
                  <Text fontWeight="medium" fontSize="sm">
                    {userName}
                  </Text>
                  <Text fontSize="xs" color="fg.muted">
                    {userEmail}
                  </Text>
                </Box>
              </HStack>
            </Box>

            <Menu.ItemGroup>
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={item.onClick}
                  cursor="pointer"
                  _hover={{ bg: "bg.muted" }}
                >
                  <HStack gap="2">
                    <Box color="fg.muted">{item.icon}</Box>
                    <Text>{item.label}</Text>
                  </HStack>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>

            <Menu.Separator />

            <Menu.Item
              value="logout"
              onClick={handleLogout}
              color="fg.error"
              cursor="pointer"
              _hover={{ bg: "red.50", color: "red.600" }}
              _dark={{ _hover: { bg: "red.900/20", color: "red.400" } }}
            >
              <HStack gap="2">
                <LuLogOut />
                <Text>Sign Out</Text>
              </HStack>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
