"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/sidebar";
import { createAuthClient } from "better-auth/react";
import { Skeleton } from "../skeleton";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const { useSession } = createAuthClient();

export const NavUser = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { isMobile } = useSidebar();

  console.log(session);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending) return <Skeleton className="h-12 w-full rounded-lg" />;

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
                <AvatarImage
                  src={session?.user.image || undefined}
                  alt={session?.user.name}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user.name}
                </span>
                <span className="truncate text-xs">{session?.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user.image || undefined}
                    alt={session?.user.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/admin/configuracion")}
              >
                <BadgeCheck />
                Configuración de la cuenta
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/admin/notificaciones")}
              >
                <Bell />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
