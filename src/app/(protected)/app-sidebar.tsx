"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquare, Video, CreditCard, Plus, Trash2, LogsIcon } from "lucide-react";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";

const applicationItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Application Logs",
        url: "/qa", 
        icon: LogsIcon
    },
    {
        title: "Logs Chat",
        url: "/logchat", 
        icon: MessageSquare
    },
    {
        title: "Billing",
        url: "/billing", 
        icon: CreditCard
    },
];

export default function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const { projects, projectId, setProjectId } = useProject();
    const utils = api.useUtils();
    
    const { mutate: deleteProject } = api.project.deleteProject.useMutation({
        onSuccess: (_, variables) => {
            // Refresh projects list
            utils.project.getProjects.invalidate();
            // Clear current project if it's the deleted one
            if (projectId === variables.projectId) {
                setProjectId("");
            }
        },
        onError: (error) => {
            console.error("Failed to delete project:", error);
        }
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleNavigation = (url: string) => {
        router.push(url);
    };

    const handleProjectSelect = (id: string) => {
        setProjectId(id);
        router.push("/dashboard"); 
    };

    const handleCreateProject = () => {
        router.push("/create");
    };

    const handleDeleteProject = (projectId: string) => {
        if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            deleteProject({ projectId });
        }
    };

    if (!isMounted) return null;

    return (
        <Sidebar collapsible="icon" variant="floating" className="bg-gray-50 dark:bg-gray-900 w-64">
            <SidebarHeader className="flex items-center p-4">
                <div className="flex items-center space-x-2">
                    <div className="text-blue-600 w-6 h-6">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L6 7l6 5-6 5 6 5 6-5-6-5 6-5z" />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">Logger</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-500 text-xs font-medium px-3 pt-2 pb-1">
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {applicationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <SidebarMenuButton
                                    key={item.url}
                                    onClick={() => handleNavigation(item.url)}
                                    isActive={pathname === item.url}
                                    className={`mb-1 rounded-md ${
                                        pathname === item.url 
                                            ? "bg-blue-600 text-white" 
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <Icon className="w-5 h-5 mr-3" />
                                        <span>{item.title}</span>
                                    </div>
                                </SidebarMenuButton>
                            );
                        })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-gray-500 text-xs font-medium px-3 pt-2 pb-1">
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {projects ? (
                            projects.map((project) => (
                                <SidebarMenuButton
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project.id)}
                                    isActive={projectId === project.id}
                                    className={`group mb-1 rounded-md ${
                                        projectId === project.id 
                                            ? "bg-blue-600 text-white" 
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <div className={`w-5 h-5 mr-3 rounded ${projectId === project.id ? 'bg-white' : 'bg-blue-600'} flex items-center justify-center`}>
                                                <span className={`text-xs font-bold ${projectId === project.id ? 'text-blue-600' : 'text-white'}`}>P</span>
                                            </div>
                                            <span className="truncate">{project.name}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteProject(project.id);
                                            }}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100/50 dark:hover:bg-red-900/50 rounded-md"
                                            title="Delete project"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </button>
                                    </div>
                                </SidebarMenuButton>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">Loading projects...</div>
                        )}
                            <SidebarMenuButton
                                onClick={handleCreateProject}
                                className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md font-medium"
                            >
                                <div className="flex items-center">
                                    <Plus className="w-4 h-4 mr-3" />
                                    <span>Create Project</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}