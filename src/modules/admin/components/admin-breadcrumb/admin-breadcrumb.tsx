"use client"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/components/breadcrumb"
import { SidebarTrigger } from "@/shared/components/sidebar"
import { Separator } from "@/shared/components/separator"
import { usePathname } from "next/navigation"

export const AdminBreadcrumb = () => {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/admin">
              Panel de administración
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          {pathNames.map((path, index) => (
            <BreadcrumbItem key={index}>
              {pathNames.length - 1 === index ? (
                <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={path} className="capitalize">
                  {path}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
