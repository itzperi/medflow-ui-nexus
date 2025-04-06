
import { useState } from "react";
import { Search, Plus, Edit2, Trash2, FilterIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock staff data
const initialStaff = [
  {
    id: 1,
    name: "Dr. James Wilson",
    role: "Doctor",
    department: "Cardiology",
    shift: "Morning",
    performanceScore: 92,
  },
  {
    id: 2,
    name: "Dr. Sarah Palmer",
    role: "Doctor",
    department: "Neurology",
    shift: "Evening",
    performanceScore: 88,
  },
  {
    id: 3,
    name: "Mark Johnson",
    role: "Nurse",
    department: "Emergency",
    shift: "Night",
    performanceScore: 85,
  },
  {
    id: 4,
    name: "Lisa Chen",
    role: "Nurse",
    department: "Pediatrics",
    shift: "Morning",
    performanceScore: 94,
  },
  {
    id: 5,
    name: "Robert Garcia",
    role: "Lab Technician",
    department: "Pathology",
    shift: "Evening",
    performanceScore: 78,
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Receptionist",
    department: "Administration",
    shift: "Morning",
    performanceScore: 82,
  },
  {
    id: 7,
    name: "Dr. Michael Brown",
    role: "Doctor",
    department: "Orthopedics",
    shift: "Evening",
    performanceScore: 90,
  },
  {
    id: 8,
    name: "Jennifer Smith",
    role: "Nurse",
    department: "Cardiology",
    shift: "Night",
    performanceScore: 87,
  },
];

type Staff = {
  id: number;
  name: string;
  role: string;
  department: string;
  shift: string;
  performanceScore: number;
};

export default function ManagementDashboard() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>(staff);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter staff based on search term, role filter and department filter
  const filterStaff = () => {
    let filtered = staff;

    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter && roleFilter !== "all") {
      filtered = filtered.filter((person) => person.role === roleFilter);
    }

    if (departmentFilter && departmentFilter !== "all") {
      filtered = filtered.filter((person) => person.department === departmentFilter);
    }

    setFilteredStaff(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setTimeout(filterStaff, 0);
  };

  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setTimeout(filterStaff, 0);
  };

  // Handle department filter change
  const handleDepartmentFilterChange = (value: string) => {
    setDepartmentFilter(value);
    setTimeout(filterStaff, 0);
  };

  const handleAddEdit = (staffMember: Staff | null) => {
    setCurrentStaff(staffMember);
    setIsAddEditDialogOpen(true);
  };

  const handleDelete = (staffMember: Staff) => {
    setCurrentStaff(staffMember);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddEditDialogOpen(false);
    toast.success(`Staff ${currentStaff ? "updated" : "added"} successfully`);
  };

  const handleConfirmDelete = () => {
    if (currentStaff) {
      setStaff((prevStaff) => 
        prevStaff.filter((s) => s.id !== currentStaff.id)
      );
      setIsDeleteDialogOpen(false);
      toast.success("Staff member removed successfully");
      filterStaff();
    }
  };

  // Get unique roles and departments for filtering
  const roles = Array.from(new Set(staff.map((s) => s.role)));
  const departments = Array.from(new Set(staff.map((s) => s.department)));

  // Get counts for summary cards
  const doctorCount = staff.filter((s) => s.role === "Doctor").length;
  const nurseCount = staff.filter((s) => s.role === "Nurse").length;
  const otherStaffCount = staff.filter(
    (s) => s.role !== "Doctor" && s.role !== "Nurse"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Management Dashboard</h1>
          <p className="text-muted-foreground">
            Manage hospital staff and track performance
          </p>
        </div>
        <Button onClick={() => handleAddEdit(null)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Doctors</CardTitle>
            <CardDescription>Total hospital physicians</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{doctorCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Nurses</CardTitle>
            <CardDescription>Total nursing staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{nurseCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Other Staff</CardTitle>
            <CardDescription>Administrative and support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{otherStaffCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>Manage hospital personnel information</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 items-center">
                <FilterIcon className="h-4 w-4 text-muted-foreground" />
                <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select
                value={departmentFilter}
                onValueChange={handleDepartmentFilterChange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          person.role === "Doctor"
                            ? "border-healthcare-blue-DEFAULT text-healthcare-blue-DEFAULT"
                            : person.role === "Nurse"
                            ? "border-healthcare-teal-DEFAULT text-healthcare-teal-DEFAULT"
                            : ""
                        }
                      >
                        {person.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{person.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          person.shift === "Morning"
                            ? "border-yellow-500 text-yellow-500"
                            : person.shift === "Evening"
                            ? "border-blue-500 text-blue-500"
                            : "border-purple-500 text-purple-500"
                        }
                      >
                        {person.shift}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              person.performanceScore >= 90
                                ? "bg-healthcare-teal-DEFAULT"
                                : person.performanceScore >= 80
                                ? "bg-healthcare-blue-DEFAULT"
                                : "bg-healthcare-red-DEFAULT"
                            }`}
                            style={{ width: `${person.performanceScore}%` }}
                          ></div>
                        </div>
                        <span
                          className={
                            person.performanceScore >= 90
                              ? "text-healthcare-teal-DEFAULT"
                              : person.performanceScore >= 80
                              ? "text-healthcare-blue-DEFAULT"
                              : "text-healthcare-red-DEFAULT"
                          }
                        >
                          {person.performanceScore}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAddEdit(person)}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(person)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentStaff ? "Edit Staff Member" : "Add New Staff Member"}
            </DialogTitle>
            <DialogDescription>
              Enter the staff member's information below
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveStaff}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={currentStaff?.name || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={currentStaff?.role || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select defaultValue={currentStaff?.department || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Pathology">Pathology</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shift" className="text-right">
                  Shift
                </Label>
                <Select defaultValue={currentStaff?.shift || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="performance" className="text-right">
                  Performance
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Input
                    id="performance"
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={currentStaff?.performanceScore || "80"}
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {currentStaff?.name} from the staff
              directory? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
