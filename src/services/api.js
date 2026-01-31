import axios from "axios";

export const API_BASE = "http://localhost:5000/api";
export const SERVER_ORIGIN = API_BASE.replace(/\/api$/, "");

export const propertyService = {
  getProperties: (params = {}) =>
    axios.get(`${API_BASE}/properties`, { params }),
  getCategories: () => axios.get(`${API_BASE}/categories`),
  getPropertyById: (idOrSlug) => {
    if (!idOrSlug) return Promise.reject(new Error("Missing id"));
    // support urls like "<id>-<slug>" or a plain slug
    const part = idOrSlug.includes("-") ? idOrSlug.split("-")[0] : idOrSlug;
    const idToUse = /^[0-9a-fA-F]{24}$/.test(part) ? part : idOrSlug;
    return axios.get(`${API_BASE}/properties/${idToUse}`);
  },
  createProperty: (formData) =>
    axios.post(`${API_BASE}/properties`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateProperty: (id, formData) =>
    axios.put(`${API_BASE}/properties/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteProperty: (id) => axios.delete(`${API_BASE}/properties/${id}`),
  createEnquiry: (id, data) =>
    axios.post(`${API_BASE}/properties/${id}/enquiries`, data),
  getEnquiries: (id) => axios.get(`${API_BASE}/properties/${id}/enquiries`),
};
