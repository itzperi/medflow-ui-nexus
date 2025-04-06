
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileUp,
  Heart,
  FilterIcon,
} from "lucide-react";
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
  DialogTrigger,
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

// Mock patient data
const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    gender: "Male",
    department: "Cardiology",
    heartRate: 72,
    bloodPressure: "120/80",
    oxygenLevel: 98,
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    department: "Neurology",
    heartRate: 68,
    bloodPressure: "118/75",
    oxygenLevel: 99,
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: 51,
    gender: "Male",
    department: "Orthopedics",
    heartRate: 76,
    bloodPressure: "135/85",
    oxygenLevel: 97,
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: 28,
    gender: "Female",
    department: "Oncology",
    heartRate: 70,
    bloodPressure: "110/70",
    oxygenLevel: 98,
  },
  {
    id: 5,
    name: "Robert Brown",
    age: 63,
    gender: "Male",
    department: "Cardiology",
    heartRate: 82,
    bloodPressure: "145/90",
    oxygenLevel: 95,
  },
  {
    id: 6,
    name: "Emily Davis",
    age: 37,
    gender: "Female",
    department: "Pediatrics",
    heartRate: 65,
    bloodPressure: "115/75",
    oxygenLevel: 99,
  },
];

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  department: string;
  heartRate: number;
  bloodPressure: string;
  oxygenLevel: number;
};

export default function PatientDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Update patients' vitals every 3 seconds to simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients((prevPatients) =>
        prevPatients.map((patient) => ({
          ...patient,
          heartRate: Math.floor(
            patient.heartRate + (Math.random() * 5 - 2.5)
          ),
          bloodPressure: `${Math.floor(
            parseInt(patient.bloodPressure.split("/")[0]) +
              (Math.random() * 5 - 2.5)
          )}/${Math.floor(
            parseInt(patient.bloodPressure.split("/")[1]) +
              (Math.random() * 5 - 2.5)
          )}`,
          oxygenLevel: Math.min(
            100,
            Math.max(
              90,
              Math.floor(patient.oxygenLevel + (Math.random() * 2 - 1))
            )
          ),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter patients based on search term and department filter
  useEffect(() => {
    let filtered = patients;

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter(
        (patient) => patient.department === departmentFilter
      );
    }

    setFilteredPatients(filtered);
  }, [patients, searchTerm, departmentFilter]);

  const handleAddEdit = (patient: Patient | null) => {
    setCurrentPatient(patient);
    setIsAddEditDialogOpen(true);
  };

  const handleDelete = (patient: Patient) => {
    setCurrentPatient(patient);
    setIsDeleteDialogOpen(true);
  };

  const handleUpload = (patient: Patient) => {
    setCurrentPatient(patient);
    setIsUploadDialogOpen(true);
  };

  const handleSavePatient = (e: React.FormEvent) => {
    e.preventDefault();
    // Form data handling would go here
    setIsAddEditDialogOpen(false);
    toast.success(`Patient ${currentPatient ? "updated" : "added"} successfully`);
  };

  const handleConfirmDelete = () => {
    if (currentPatient) {
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== currentPatient.id)
      );
      setIsDeleteDialogOpen(false);
      toast.success("Patient deleted successfully");
    }
  };

  const handleUploadSave = () => {
    // File upload handling would go here
    setIsUploadDialogOpen(false);
    toast.success("Medical reports uploaded successfully");
  };

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Pediatrics",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor patient information
          </p>
        </div>
        <Button onClick={() => handleAddEdit(null)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Patients</CardTitle>
            <CardDescription>Active patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Departments</CardTitle>
            <CardDescription>Active medical departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(patients.map((p) => p.department)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Critical Cases</CardTitle>
            <CardDescription>Patients needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-red-DEFAULT">
              {patients.filter((p) => p.oxygenLevel < 96).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>Manage patient information and vitals</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <FilterIcon className="h-4 w-4 text-muted-foreground" />
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
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
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Heart Rate</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>O₂ Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Heart
                            className={`h-5 w-5 ${
                              patient.heartRate > 80
                                ? "text-healthcare-red-DEFAULT animate-heartbeat"
                                : "text-healthcare-teal-DEFAULT"
                            }`}
                            fill="currentColor"
                          />
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-healthcare-red-light opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-healthcare-red-DEFAULT"></span>
                          </span>
                        </div>
                        {patient.heartRate} BPM
                      </div>
                    </TableCell>
                    <TableCell>{patient.bloodPressure} mmHg</TableCell>
                    <TableCell>
                      <div
                        className={`${
                          patient.oxygenLevel < 95
                            ? "text-healthcare-red-DEFAULT"
                            : patient.oxygenLevel < 97
                            ? "text-amber-500"
                            : "text-healthcare-teal-DEFAULT"
                        }`}
                      >
                        {patient.oxygenLevel}%
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
                          <DropdownMenuItem
                            onClick={() => handleAddEdit(patient)}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpload(patient)}
                          >
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload Reports
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(patient)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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

      {/* Add/Edit Patient Dialog */}
      <Dialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentPatient ? "Edit Patient" : "Add New Patient"}
            </DialogTitle>
            <DialogDescription>
              Enter the patient's information below
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePatient}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={currentPatient?.name || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  defaultValue={currentPatient?.age || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Select defaultValue={currentPatient?.gender || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select defaultValue={currentPatient?.department || ""}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentPatient?.name}'s record? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Medical Reports Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Medical Reports</DialogTitle>
            <DialogDescription>
              Upload medical reports for {currentPatient?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="medical-report">Medical Report</Label>
              <Input id="medical-report" type="file" />
              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, JPG, PNG
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUploadSave}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
