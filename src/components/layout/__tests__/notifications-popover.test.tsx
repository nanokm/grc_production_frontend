import { render, screen, fireEvent } from "@/tests/test-utils"
import {
  NotificationsPopover,
  getNotificationCounts,
  getNotificationColor,
} from "../notifications-popover"

describe("NotificationsPopover", () => {
  it("renders notification bell button", () => {
    render(<NotificationsPopover />)
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument()
  })

  it("shows unread count badge when there are unread notifications", () => {
    render(<NotificationsPopover />)
    // Find the badge by looking for the circle element containing "2"
    const badges = screen.getAllByText("2")
    expect(badges.length).toBeGreaterThan(0)
  })

  it("opens popover when clicked", async () => {
    render(<NotificationsPopover />)
    const bellButton = screen.getByLabelText("Notifications")

    fireEvent.click(bellButton)

    expect(await screen.findByText("Notifications")).toBeInTheDocument()
  })

  it("shows inbox and archived tabs", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByText("Inbox")).toBeInTheDocument()
    expect(screen.getByText("Archived")).toBeInTheDocument()
  })

  it("displays notification items", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByText("New Risk Assessment")).toBeInTheDocument()
    expect(screen.getByText("Compliance Alert")).toBeInTheDocument()
  })

  it("shows timestamps on notifications", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByText("5 min ago")).toBeInTheDocument()
  })

  it("shows empty state for archived tab", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    const archivedTab = await screen.findByText("Archived")
    fireEvent.click(archivedTab)

    expect(await screen.findByText("No archived notifications")).toBeInTheDocument()
  })

  it("shows mark all as read button", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByLabelText("Mark all as read")).toBeInTheDocument()
  })

  it("shows notification settings button", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByLabelText("Notification settings")).toBeInTheDocument()
  })

  it("shows view all notifications button", async () => {
    render(<NotificationsPopover />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByText("View all notifications")).toBeInTheDocument()
  })

  it("shows empty state when no notifications provided", async () => {
    render(<NotificationsPopover notifications={[]} />)
    fireEvent.click(screen.getByLabelText("Notifications"))

    expect(await screen.findByText("No notifications")).toBeInTheDocument()
  })
})

describe("getNotificationCounts", () => {
  it("counts unread notifications correctly", () => {
    const notifications = [
      { id: "1", title: "Test", message: "msg", type: "info" as const, read: false, timestamp: "now" },
      { id: "2", title: "Test2", message: "msg", type: "info" as const, read: true, timestamp: "now" },
      { id: "3", title: "Test3", message: "msg", type: "info" as const, read: false, timestamp: "now" },
    ]

    const counts = getNotificationCounts(notifications)

    expect(counts.unread).toBe(2)
    expect(counts.all).toBe(3)
  })

  it("returns zero for empty array", () => {
    const counts = getNotificationCounts([])

    expect(counts.unread).toBe(0)
    expect(counts.all).toBe(0)
  })
})

describe("getNotificationColor", () => {
  it("returns correct colors for each type", () => {
    expect(getNotificationColor("info")).toBe("blue")
    expect(getNotificationColor("warning")).toBe("orange")
    expect(getNotificationColor("success")).toBe("green")
    expect(getNotificationColor("error")).toBe("red")
  })
})
