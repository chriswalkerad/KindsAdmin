"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { MoreVertical, HelpCircle, Mail, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Images from "@/utils/images";
import Image from "next/image";
import TableWrapper from "@/components/global/wrappers/TableWrapper";
import { AccountPageProps } from ".";

export default function AccountsTable({ filter, setFilter }: AccountPageProps) {
  const [offices, setOffices] = React.useState([
    {
      id: 1,
      name: "A-One Big Dental Office",
      healthScore: 20, // Updated key
      status: "Active",
      connection: "gmail",
      groups: 13,
      users: 32,
      created: "12/23/2023",
      lastSync: "12/23/2024",
      autoSync: true,
    },
    {
      id: 2,
      name: "Bright Smiles Clinic",
      healthScore: 40,
      status: "Inactive", // Different status
      connection: "microsoft", // Different connection
      groups: 5,
      users: 100,
      created: "01/10/2024",
      lastSync: "02/15/2024",
      autoSync: false, // AutoSync disabled
    },
    {
      id: 3,
      name: "Dental Care Group",
      healthScore: 60,
      status: "Active",
      connection: "okta", // Different connection
      groups: 8,
      users: 22,
      created: "03/05/2023",
      lastSync: "11/10/2024",
      autoSync: true,
    },
    {
      id: 4,
      name: "Healthy Smiles Co.",
      healthScore: 80,
      status: "Active",
      connection: "gmail", // Gmail connection
      groups: 18,
      users: 50,
      created: "02/14/2023",
      lastSync: "10/12/2024",
      autoSync: true,
    },
    {
      id: 5,
      name: "Perfect Smile Dentistry",
      healthScore: 99,
      status: "Inactive",
      connection: "microsoft", // Microsoft connection
      groups: 121,
      users: 320,
      created: "07/21/2023",
      lastSync: "09/30/2024",
      autoSync: false,
    },
    {
      id: 6,
      name: "Premier Dental Group",
      healthScore: 100,
      status: "Active",
      connection: "okta",
      groups: 4,
      users: 32,
      created: "05/11/2023",
      lastSync: "08/20/2024",
      autoSync: true,
    },
    {
      id: 7,
      name: "Modern Dental Associates",
      healthScore: 75,
      status: "Active",
      connection: "gmail",
      groups: 10,
      users: 45,
      created: "06/18/2023",
      lastSync: "09/22/2024",
      autoSync: true,
    },
    {
      id: 8,
      name: "CareFirst Dental",
      healthScore: 50,
      status: "Inactive",
      connection: "okta",
      groups: 6,
      users: 20,
      created: "08/01/2023",
      lastSync: "07/01/2024",
      autoSync: false,
    },
  ]);

  const getProgressColor = (progress: number) => {
    if (progress < 79) return "bg-red-500";
    if (progress < 99) return "bg-orange-500";
    if (progress < 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleToggle = (officeId: number) => {
    setOffices(
      offices.map((office) =>
        office.id === officeId
          ? { ...office, autoSync: !office.autoSync }
          : office
      )
    );
  };

  const filteredAccount = offices.filter((acc) => {
    const matchesSearchQuery =
      filter.searchQuery === "" ||
      acc.name.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchesStatus = filter.active
      ? acc.status.toLowerCase() === "active"
      : true;

    let matchesProgress = true;
    switch (filter.healthScore) {
      case "low":
        matchesProgress = acc.healthScore < 79;
        break;
      case "medium":
        matchesProgress = acc.healthScore >= 79 && acc.healthScore < 99;
        break;
      case "high":
        matchesProgress = acc.healthScore >= 99 && acc.healthScore < 100;
        break;
      case "perfect":
        matchesProgress = acc.healthScore === 100;
        break;
      case "all":
      default:
        matchesProgress = true;
        break;
    }

    // const matchesConnections =
    //   filter.connections === "all" || acc.connection === filter.connections;

    return (
      matchesSearchQuery && matchesStatus && matchesProgress
      //  &&
      // matchesConnections
    );
  });

  return (
    <TableWrapper>
      <Table className="">
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="py-4 px-6">Account</TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-1">
                Health Score
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Overall health score of the account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="py-4">Status</TableHead>
            <TableHead className="py-4">Groups</TableHead>
            <TableHead className="py-4">Users</TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-1">
                Connections
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connected services and integrations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="py-4">Created</TableHead>
            <TableHead className="py-4">Last sync</TableHead>
            <TableHead className="py-4">
              <div className="flex items-center gap-1">
                Auto-Sync
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle automatic synchronization</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {filteredAccount.map((office) => (
            <TableRow key={office.id} className="">
              <TableCell className="font-medium py-3 pl-6">
                {office.name}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(
                        office.healthScore
                      )}`}
                      style={{ width: `${office.healthScore}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {office.healthScore}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <Badge
                  variant="outline"
                  className={`${
                    office.status.toLowerCase() === "active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {office.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3">{office.groups}</TableCell>
              <TableCell className="py-3 text-blue-600">
                {office.users}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex gap-3 items-center">
                  <Image
                    src={Images.emailLog.gmail}
                    alt=""
                    className="w-6 h-6"
                  />
                  <Image
                    src={Images.emailLog.ms_outlook}
                    alt=""
                    className="w-6 h-6"
                  />
                  <Image
                    src={Images.emailLog.okta}
                    alt=""
                    className="w-6 h-6"
                  />
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    1 year ago
                  </span>
                  <span className="text-sm">{office.created}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Today</span>
                  <span className="text-sm">{office.lastSync}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <Switch
                  checked={office.autoSync}
                  onCheckedChange={() => handleToggle(office.id)}
                />
              </TableCell>
              <TableCell className="py-3">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
