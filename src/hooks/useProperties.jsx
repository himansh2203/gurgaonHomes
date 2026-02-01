import { useState, useEffect, useCallback } from "react";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";

export const useProperties = (initialParams = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    ...initialParams,
  });
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const fetchProperties = useCallback(
    async (override = {}) => {
      setLoading(true);
      const toUse = { ...params, ...override };
      try {
        const res = await propertyService.getProperties(toUse);
        // backend returns { data, total, page, pages } or fallback returns array
        if (res && res.data) {
          if (Array.isArray(res.data)) {
            setProperties(res.data);
            setTotal(res.data.length);
            setPages(1);
          } else if (Array.isArray(res.data.data)) {
            setProperties(res.data.data);
            setTotal(res.data.total || 0);
            setPages(res.data.pages || 1);
            setParams((p) => ({ ...p, page: res.data.page || p.page }));
          } else {
            // unknown shape
            setProperties([]);
          }
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    },
    [params],
  );

  useEffect(() => {
    const t = setTimeout(() => fetchProperties(), 0);

    const socket = io(SERVER_ORIGIN);
    const onUpdate = () => fetchProperties();
    socket.on("propertiesUpdated", onUpdate);

    window.addEventListener("propertiesUpdated", onUpdate);

    return () => {
      clearTimeout(t);
      socket.off("propertiesUpdated", onUpdate);
      socket.disconnect();
      window.removeEventListener("propertiesUpdated", onUpdate);
    };
  }, [fetchProperties]);

  const setFilters = (next) =>
    setParams((p) => ({ ...p, ...next, page: next.page || 1 }));

  return {
    properties,
    loading,
    error,
    refresh: fetchProperties,
    params,
    setParams: setFilters,
    total,
    pages,
  };
};
