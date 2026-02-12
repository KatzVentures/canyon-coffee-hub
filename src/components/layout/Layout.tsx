import { Outlet, Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Factory,
  TrendingUp,
  Target,
  Inbox,
  Truck,
  DollarSign,
  Coffee,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const navGroups = [
  {
    title: "Overview",
    items: [
      { name: "Executive Dashboard", href: "/dashboard", icon: LayoutDashboard, person: "Rachel Torres" },
    ],
  },
  {
    title: "Production",
    items: [
      { name: "Production", href: "/production", icon: Factory, person: "Ben Okonkwo" },
      { name: "Production Roll-Up", href: "/production-rollup", icon: TrendingUp, person: "Ben Okonkwo" },
    ],
  },
  {
    title: "Sales",
    items: [
      { name: "Pipeline", href: "/pipeline", icon: Target, person: "Tanya Greene" },
    ],
  },
  {
    title: "Service",
    items: [
      { name: "Customer Inbox", href: "/inbox", icon: Inbox, person: "Maria Santos" },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Delivery Planning", href: "/delivery", icon: Truck, person: "Carlos Reyes" },
      { name: "Finance", href: "/finance", icon: DollarSign, person: "Derek Huang" },
    ],
  },
]

function usePageTitle() {
  const { pathname } = useLocation()
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.href === pathname) return { title: item.name, person: item.person }
    }
  }
  return { title: "Copper Canyon Coffee", person: "" }
}

export function Layout() {
  const location = useLocation()
  const { title, person } = usePageTitle()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Coffee className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Copper Canyon Coffee</span>
                    <span className="text-xs opacity-60">Operations Platform</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.href}
                      tooltip={item.name}
                    >
                      <Link to={item.href}>
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <div className="px-2 py-1 text-[11px] opacity-50 group-data-[collapsible=icon]:hidden">
            <p>MVP Prototype</p>
            <p>Data as of Feb 5, 2025</p>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div>
            <h1 className="text-sm font-semibold leading-tight">{title}</h1>
            {person && <p className="text-xs text-muted-foreground">{person}</p>}
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
