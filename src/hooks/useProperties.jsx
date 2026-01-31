import { useState, useEffect, useCallback } from "react";
import { propertyService, SERVER_ORIGIN } from "../services/api";
import { io } from "socket.io-client";

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(() => {
    setLoading(true);
    propertyService
      .getProperties()
      .then((res) => {
        setProperties(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load properties");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // defer initial fetch to avoid sync setState within effect (ESLint rule)
    const t = setTimeout(() => fetchProperties(), 0);

    const socket = io(SERVER_ORIGIN);
    const onUpdate = () => fetchProperties();
    socket.on("propertiesUpdated", onUpdate);

    // fallback window event
    window.addEventListener("propertiesUpdated", onUpdate);

    return () => {
      clearTimeout(t);
      socket.off("propertiesUpdated", onUpdate);
      socket.disconnect();
      window.removeEventListener("propertiesUpdated", onUpdate);
    };
  }, [fetchProperties]);

  return { properties, loading, error, refresh: fetchProperties };
};
