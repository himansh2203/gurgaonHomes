import React, { useEffect } from 'react';
import './Toast.css';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`gh-toast ${type}`}>
      <div className="gh-toast-icon">
        {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      </div>
      <span className="gh-toast-message">{message}</span>
      <button onClick={onClose} className="gh-toast-close">
        <X size={16} />
      </button>
    </div>
  );
}
