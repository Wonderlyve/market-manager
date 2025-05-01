
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ShoppingCart, BarChart3, Package, List, Users } from 'lucide-react';

export function SupermarketSidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Tableau de bord',
      path: '/',
      icon: BarChart3
    },
    {
      title: 'Point de vente',
      path: '/pos',
      icon: ShoppingCart
    },
    {
      title: 'Gestion du stock',
      path: '/stock',
      icon: Package
    },
    {
      title: 'Articles',
      path: '/articles',
      icon: List
    },
    {
      title: 'Clients',
      path: '/clients',
      icon: Users
    }
  ];
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-6">
        <h2 className="text-xl font-bold text-supermarket-blue">ZenithMarket</h2>
      </SidebarHeader>
      
      <SidebarContent className="pr-1">
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-colors",
                      location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          ZenithMarket Manager v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
