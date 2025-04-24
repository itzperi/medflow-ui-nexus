
import { useState } from "react";
import { toast } from "sonner";
import QRCode from "qrcode.react";
import { QrCode, Download, Clipboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Mock patient data
const patients = [
  { id: 1, name: "", age: 45, patientId: "PT-001-2023" },
  { id: 2, name: "", age: 32, patientId: "PT-002-2023" },
  { id: 3, name: "", age: 51, patientId: "PT-003-2023" },
  { id: 4, name: "", age: 28, patientId: "PT-004-2023" },
  { id: 5, name: "", age: 63, patientId: "PT-005-2023" },
  { id: 6, name: "", age: 37, patientId: "PT-006-2023" },
];

export default function QRGenerator() {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [customData, setCustomData] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");
  const [qrSize, setQrSize] = useState<number>(256);
  const [activeTab, setActiveTab] = useState<string>("patient");
  
  const generatePatientQR = () => {
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    
    const patient = patients.find(p => p.id.toString() === selectedPatient);
    if (patient) {
      const data = {
        type: "patient",
        patientId: patient.patientId,
        name: patient.name,
        timestamp: new Date().toISOString()
      };
      
      setQrValue(JSON.stringify(data));
      toast.success(`QR code generated for ${patient.name}`);
    }
  };
  
  const generateCustomQR = () => {
    if (!customData.trim()) {
      toast.error("Please enter data for the QR code");
      return;
    }
    
    setQrValue(customData);
    toast.success("Custom QR code generated");
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setQrValue("");
  };
  
  const downloadQR = () => {
    const canvas = document.getElementById("patient-qrcode") as HTMLCanvasElement;
    if (!canvas) return;
    
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${activeTab === "patient" ? "patient" : "custom"}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR code downloaded successfully");
  };
  
  const copyQRData = () => {
    if (!qrValue) {
      toast.error("No QR data available to copy");
      return;
    }
    
    navigator.clipboard.writeText(qrValue);
    toast.success("QR data copied to clipboard");
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-healthcare-teal-light/20 p-3 rounded-full">
            <QrCode className="h-8 w-8 text-healthcare-teal-DEFAULT" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Patient QR Generator</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Generate QR codes for patient identification and medical record access
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>
              Create QR codes for patients or custom data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Patient QR</TabsTrigger>
                <TabsTrigger value="custom">Custom QR</TabsTrigger>
              </TabsList>
              <TabsContent value="patient" className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="patient" className="text-sm font-medium">
                    Select Patient
                  </Label>
                  <div className="flex gap-2 items-center mt-1.5">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Choose a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.name} - {patient.patientId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="qrSize" className="text-sm font-medium">
                    QR Code Size
                  </Label>
                  <div className="flex flex-col gap-2 mt-1.5">
                    <Input
                      id="qrSize"
                      type="range"
                      min="128"
                      max="512"
                      step="8"
                      value={qrSize}
                      onChange={(e) => setQrSize(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>{qrSize}px</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={generatePatientQR}
                >
                  Generate Patient QR Code
                </Button>
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="customData" className="text-sm font-medium">
                    Custom QR Data
                  </Label>
                  <div className="mt-1.5">
                    <Input
                      id="customData"
                      placeholder="Enter custom data or URL"
                      value={customData}
                      onChange={(e) => setCustomData(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter any text, URL, or structured data
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="customQrSize" className="text-sm font-medium">
                    QR Code Size
                  </Label>
                  <div className="flex flex-col gap-2 mt-1.5">
                    <Input
                      id="customQrSize"
                      type="range"
                      min="128"
                      max="512"
                      step="8"
                      value={qrSize}
                      onChange={(e) => setQrSize(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>{qrSize}px</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={generateCustomQR}
                >
                  Generate Custom QR Code
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
            <CardDescription>
              Scan with a mobile device to access patient information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center min-h-[256px]">
            {qrValue ? (
              <div className="p-4 bg-white rounded-lg shadow-inner">
                <QRCode
                  id="patient-qrcode"
                  value={qrValue}
                  size={qrSize}
                  level="H"
                  includeMargin
                  renderAs="canvas"
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8 border-2 border-dashed border-muted rounded-lg">
                <QrCode className="h-16 w-16 mx-auto mb-2 opacity-30" />
                <p>QR code will appear here</p>
                <p className="text-sm">Select a patient or enter custom data</p>
              </div>
            )}
          </CardContent>
          {qrValue && (
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto" onClick={downloadQR}>
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={copyQRData}>
                <Clipboard className="mr-2 h-4 w-4" />
                Copy Data
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>How to Use Patient QR Codes</CardTitle>
          <CardDescription>
            Quick guide for implementing QR codes in patient care
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-healthcare-blue-light/20 flex items-center justify-center">
                <span className="text-healthcare-blue-DEFAULT font-bold">1</span>
              </div>
              <h3 className="font-medium">Generate</h3>
              <p className="text-sm text-muted-foreground">
                Select a patient and generate their unique QR code for identification
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-healthcare-blue-light/20 flex items-center justify-center">
                <span className="text-healthcare-blue-DEFAULT font-bold">2</span>
              </div>
              <h3 className="font-medium">Download</h3>
              <p className="text-sm text-muted-foreground">
                Save the QR code as an image file or print it for patient wristbands
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-healthcare-blue-light/20 flex items-center justify-center">
                <span className="text-healthcare-blue-DEFAULT font-bold">3</span>
              </div>
              <h3 className="font-medium">Scan</h3>
              <p className="text-sm text-muted-foreground">
                Use a QR scanner in the hospital app to quickly access patient information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
