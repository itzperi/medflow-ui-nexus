import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for revenue by department
const departmentData = [
  { name: "Cardiology", value: 94500 },
  { name: "Neurology", value: 72000 },
  { name: "Orthopedics", value: 85600 },
  { name: "Oncology", value: 118000 },
  { name: "Pediatrics", value: 65700 },
];

// Mock data for monthly revenue
const monthlyData = [
  { name: "Jan", revenue: 48000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 61000 },
  { name: "Apr", revenue: 65000 },
  { name: "May", revenue: 72000 },
  { name: "Jun", revenue: 78000 },
  { name: "Jul", revenue: 86000 },
  { name: "Aug", revenue: 91000 },
  { name: "Sep", revenue: 88000 },
  { name: "Oct", revenue: 94000 },
  { name: "Nov", revenue: 89000 },
  { name: "Dec", revenue: 98000 },
];

// Mock data for payment methods
const paymentData = [
  { name: "Insurance", value: 245000 },
  { name: "Credit Card", value: 156000 },
  { name: "Debit Card", value: 87000 },
  { name: "Cash", value: 48800 },
];

// Colors for the pie chart
const COLORS = ["#0EA5E9", "#14B8A6", "#8B5CF6", "#F43F5E", "#F97316"];

export default function RevenueDashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  
  const [department, setDepartment] = useState<string>("All Departments");
  const [paymentMethod, setPaymentMethod] = useState<string>("All Methods");
  
  // Format currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  
  // Calculate total revenue
  const totalRevenue = departmentData.reduce(
    (acc, item) => acc + item.value,
    0
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Revenue Dashboard</h1>
        <p className="text-muted-foreground">
          Track and analyze hospital revenue metrics
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Overall hospital earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-blue-DEFAULT">
              {formatter.format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Monthly Average</CardTitle>
            <CardDescription>Average monthly revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-teal-DEFAULT">
              {formatter.format(totalRevenue / 12)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Growth Rate</CardTitle>
            <CardDescription>Monthly growth percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-healthcare-blue-dark">
              +8.3%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue analysis</CardDescription>
            <Tabs defaultValue="line" className="mt-4">
              <TabsList>
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="line" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => formatter.format(value).replace("$", "")} 
                      />
                      <Tooltip 
                        formatter={(value: number) => formatter.format(value)} 
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0EA5E9"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="bar" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis 
                        tickFormatter={(value) => formatter.format(value).replace("$", "")} 
                      />
                      <Tooltip 
                        formatter={(value: number) => formatter.format(value)} 
                      />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        fill="#0EA5E9"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Department</CardTitle>
            <CardDescription>Department-wise distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatter.format(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              {departmentData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <span>{formatter.format(item.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Filters</CardTitle>
          <CardDescription>Analyze revenue by specific criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  {departmentData.map((dept) => (
                    <SelectItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Methods">All Methods</SelectItem>
                  {paymentData.map((method) => (
                    <SelectItem key={method.name} value={method.name}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-lg mb-4">Payment Method Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => formatter.format(value).replace("$", "")} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatter.format(value)} 
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="#14B8A6"
                    name="Revenue"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
