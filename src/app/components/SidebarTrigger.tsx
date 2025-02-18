import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useSidebar } from "../context/SidebarContext"

export function SidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="md:hidden bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-full shadow-md"
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

