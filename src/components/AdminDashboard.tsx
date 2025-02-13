
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Settings, MessageSquare, Users, TrendingUp } from "lucide-react";

const mockData = [
  { date: "2024-01", interactions: 120 },
  { date: "2024-02", interactions: 230 },
  { date: "2024-03", interactions: 450 },
  { date: "2024-04", interactions: 680 },
];

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-capaciti-red/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-capaciti-red" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interactions</p>
              <h3 className="text-2xl font-bold">1,480</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-capaciti-navy/10 rounded-lg">
              <Users className="h-6 w-6 text-capaciti-navy" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <h3 className="text-2xl font-bold">342</h3>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Response Rate</p>
              <h3 className="text-2xl font-bold">98.5%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Interaction Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="interactions"
                stroke="#ea384c"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Program Information</p>
              <p className="text-sm text-gray-600">42% of inquiries</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Career Support</p>
              <p className="text-sm text-gray-600">28% of inquiries</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">Application Process</p>
              <p className="text-sm text-gray-600">18% of inquiries</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Update Chat Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              View All Conversations
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage User Access
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
