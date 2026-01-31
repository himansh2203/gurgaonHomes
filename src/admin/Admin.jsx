import React, { useState, useEffect, useCallback } from "react";
import "./Admin.css";
import { Lock, Home, Bell, LogOut, Plus, Search, Filter } from "lucide-react";
import AddPropertyTab from "./components/AddPropertyTab";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";
import { mockProperties } from "./mockData";

// using central API base (propertyService) and SERVER_ORIGIN for uploads/fallbacks

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [data, setData] = useState({
    title: "",
    category: "house",
    location: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    status: "active",
  });

  // Fetch properties from backend
  const fetchProperties = useCallback(async () => {
    try {
      // set loading inside async flow (avoid sync setState in effect body)
      setLoading(true);
      const resp = await propertyService
        .getProperties()
        .catch(() => ({ data: mockProperties }));
      setProperties(resp.data || mockProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProperties();
      // fetch categories for admin form
      propertyService
        .getCategories()
        .then((r) => setCategories(r.data))
        .catch(() => {});

      const socket = io(SERVER_ORIGIN);
      const handler = () => fetchProperties();
      socket.on("propertiesUpdated", handler);
      return () => socket.disconnect();
    }
  }, [isLoggedIn, fetchProperties]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      setPassword("");
    } else {
      alert("❌ Wrong Password! Use: admin123");
    }
  };

  const submitProperty = async (e, formData) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProperty) {
        const idToUpdate = editingProperty._id || editingProperty.id;
        await propertyService.updateProperty(idToUpdate, formData);
        alert("✅ Property updated successfully!");
      } else {
        await propertyService.createProperty(formData);
        alert("✅ Property added successfully!");
      }

      // notify other parts of the app to refresh listings
      window.dispatchEvent(new Event("propertiesUpdated"));

      setEditingProperty(null);
      setData({
        title: "",
        location: "",
        description: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        status: "active",
      });
      setActiveTab("properties");
      fetchProperties();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error saving property!");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await propertyService.deleteProperty(id);
      alert("✅ Property deleted!");
      // inform other views and refresh list
      window.dispatchEvent(new Event("propertiesUpdated"));
      fetchProperties();
    } catch (error) {
      console.error(error);
      alert("❌ Error deleting property!");
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || property.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || property.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (!isLoggedIn) {
    return (
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-icon">
            <Lock size={48} />
          </div>
          <h1>EstateAdmin Pro</h1>
          <p>Connected to Backend API</p>
          <input
            type="password"
            placeholder="admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login to Admin</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <header className="topbar">
        <div className="brand">
          <Home size={24} /> EstateAdmin Pro{" "}
          <span className="live-indicator">● LIVE</span>
        </div>
        <div className="header-actions">
          <Bell size={20} />
          <button onClick={() => setIsLoggedIn(false)} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={activeTab === "dashboard" ? "active" : ""}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setActiveTab("properties")}
          className={activeTab === "properties" ? "active" : ""}
        >
          🏠 Properties ({filteredProperties.length})
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={activeTab === "add" ? "active" : ""}
        >
          ➕ Add Property
        </button>
      </aside>

      <main className="content">
        {activeTab === "dashboard" && (
          <div className="dashboard">
            <h2>📊 Dashboard</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Properties</h3>
                <span className="stat-number">{properties.length}</span>
              </div>
              <div className="stat-card">
                <h3>Active Listings</h3>
                <span className="stat-number">
                  {properties.filter((p) => p.status === "active").length}
                </span>
              </div>
              <div className="stat-card">
                <h3>Total Views</h3>
                <span className="stat-number">
                  {properties.reduce((sum, p) => sum + (p.views || 0), 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div className="properties-tab">
            <div className="tab-header">
              <h2>🏠 Properties ({filteredProperties.length})</h2>
              <div className="search-filter">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search properties..."
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>

                <select
                  className="filter-select"
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading properties...</div>
            ) : filteredProperties.length === 0 ? (
              <div className="empty-state">
                <h3>No Properties Found</h3>
                <p>Add your first property to get started</p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="btn-primary"
                >
                  ➕ Add Property
                </button>
              </div>
            ) : (
              <div className="properties-grid">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="property-card">
                    <div className="property-image">
                      {property.images?.[0] ? (
                        <img
                          src={(() => {
                            const img = property.images[0];
                            const fallback = `https://source.unsplash.com/300x200/?${encodeURIComponent(
                              (property.category || property.type || "property")
                                .toString()
                                .toLowerCase(),
                            )}`;
                            if (!img) return fallback;
                            if (img.startsWith("http")) return img;
                            if (img.startsWith("/"))
                              return `${SERVER_ORIGIN}${img}`;
                            return `${SERVER_ORIGIN}/uploads/${img}`;
                          })()}
                          alt={property.title}
                          onError={(e) =>
                            (e.target.src = `https://source.unsplash.com/300x200/?property`)
                          }
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>
                    <div className="property-info">
                      <h3>{property.title}</h3>
                      <p className="location">{property.location}</p>
                      <p className="price">{property.price}</p>
                      <div className="property-meta">
                        <span>{property.bedrooms} BHK</span>
                        <span>{property.area} sqft</span>
                        <span className={`status ${property.status}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className="property-actions">
                        <button
                          onClick={() => {
                            setEditingProperty(property);
                            setData(property);
                            setActiveTab("add");
                          }}
                          className="btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            deleteProperty(property._id || property.id)
                          }
                          className="btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "add" && (
          <div className="add-property-wrapper">
            <div className="back-btn">
              <button onClick={() => setActiveTab("properties")}>
                ← Back to Properties
              </button>
            </div>
            <h2>{editingProperty ? "Edit Property" : "Add New Property"}</h2>
            <AddPropertyTab
              data={data}
              setData={setData}
              loading={loading}
              editing={!!editingProperty}
              onSubmit={submitProperty}
              editingProperty={editingProperty}
            />
          </div>
        )}
      </main>
    </div>
  );
}
