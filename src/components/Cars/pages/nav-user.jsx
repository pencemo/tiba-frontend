
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { usePorfile } from "@/Context/ProfileContext"
import { authService } from "@/API/services/authService"
import { useNavigate } from "react-router-dom"
const url = import.meta.env.VITE_API_BASE_URL;
const userItems = [
  {
    title: "Account",
    icon: BadgeCheck,
    to: "/user"
  },
  {
    title: "Bookings",
    icon: CreditCard,
    to: '/user/booking'
  },
  {
    title: "Notifications",
    icon: Bell,
    to: '/user/notification'
  }
]

const adminItems = [
  {
    title: 'Account',
    icon: BadgeCheck,
    to: '/admin'
  },
  {
    title: "Settings",
    icon: Settings,
    to: '/admin/settings'
  },
  {
    title: "Notifications",
    icon: Bell,
    to: '/admin/notification'
  }
]

export function NavUser({
  user,
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const {setProfile}=usePorfile()
  const handleLogout = () => {
    authService.logout()
      .then(() =>{
        setProfile(null)
      })
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.profileImg ? <AvatarImage className='object-cover' src={user?.profileImg} alt={user.name} />:
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage className='object-cover' src={user?.profileImg || 'https://preline.co/assets/img/160x160/img1.jpg'} alt={user.name} />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              {user.isAdmin ? adminItems.map((item) =>{
                return (
                  <DropdownMenuItem key={item.title} onClick={()=>navigate(item.to)}>
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                )
              })
              : userItems.map((item) =>{
                return (
                  <DropdownMenuItem key={item.title} onClick={()=>navigate(item.to)}>
                    <item.icon />
                    {item.title}
                  </DropdownMenuItem>
                )
              })
            }
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
