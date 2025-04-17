import * as React from "react";
import { Command, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarFilter } from "./SidebarFilter";
import { NavUser } from "./nav-user";
import { usePorfile } from "@/Context/ProfileContext";
import { carCategory, carMakes } from "@/Utils/ArrayList";
import { Input } from "@/components/ui/input";
import { useFilterContext } from "@/Context/filterContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAllShowroom } from "@/hooks/QueryHooks/useShowroom";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  category: {
    name: "Category",
    items: carCategory,
  },
  make: {
    name: "Car Makes",
    items: carMakes,
  },
  fuleType: {
    name: "Fule type",
    items: ["All", "petrol", "diesel", "electric", "hybrid"],
  },
};

export function AppSidebar({ ...props }) {
  const { profile } = usePorfile();
  const { data: showroomDetails } = useAllShowroom();
  const [showroomData, setShowroomData] = React.useState([]);

  React.useEffect(() => {
    if (showroomDetails && showroomDetails.data) {
      setShowroomData(showroomDetails.data);
    }
  }, [showroomDetails]);

  const {
    setSearch,
    setCategory,
    category,
    setCarMakes,
    carMakes,
    setFuleType,
    fuleType,
    showroom,
    setShowroom,
  } = useFilterContext();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {profile ? (
          <NavUser user={profile} />
        ) : (
          <SidebarMenuButton size="lg" asChild>
            <Link to={"/"}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Tiba cars</span>
                <span className="truncate text-xs">Rent a cars</span>
              </div>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <Input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search item"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="mx-0" />
        <SidebarFilter
          setCheckBox={setCategory}
          checkBoxValue={category}
          fiterItem={data.category}
          // defaultOpen={true}
        />
        <SidebarFilter
          setCheckBox={setCarMakes}
          checkBoxValue={carMakes}
          fiterItem={data.make}
        />
        <SidebarGroup>
          <SidebarGroupLabel>Location</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              onValueChange={(val) => setShowroom(val)}
              // defaultValue={showroom}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your city</SelectLabel>
                  {[{ name: "All", _id: "all" }, ...showroomData].map(
                    (item, index) => {
                      return (
                        <SelectItem key={index} value={item._id}>
                          {item.name === "All"
                            ? "All Cars"
                            : `${item.city}, ${item.state}`}
                        </SelectItem>
                      );
                    }
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Fule type</SidebarGroupLabel>
          <SidebarGroupContent>
            <RadioGroup
              defaultValue={fuleType}
              onValueChange={(val) => setFuleType(val)}
            >
              {["all", "petrol", "diesel", "electric", "hybrid"].map(
                (item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-2 capitalize"
                    >
                      <RadioGroupItem value={item} id={`r${index}`} />
                      <Label htmlFor={`r${index}`}>{item}</Label>
                    </div>
                  );
                }
              )}
            </RadioGroup>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
