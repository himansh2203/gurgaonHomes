import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Home, Users, DollarSign, TrendingUp } from "lucide-react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardTab({ properties, chartData, pieData }) {
  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Home size={28} />
          </div>
          <div>
            <h3>{properties.length}</h3>
            <p>Total Properties</p>
          </div>
          <span className="trend positive">+18%</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={28} />
          </div>
          <div>
            <h3>127</h3>
            <p>Active Leads</p>
          </div>
          <span className="trend positive">+24%</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <DollarSign size={28} />
          </div>
          <div>
            <h3>₹4.2 Cr</h3>
            <p>Total Revenue</p>
          </div>
          <span className="trend positive">+12%</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <TrendingUp size={28} />
          </div>
          <div>
            <h3>23.4%</h3>
            <p>Conversion</p>
          </div>
          <span className="trend positive">+8%</span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Property Growth</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="properties" fill="#667eea" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
