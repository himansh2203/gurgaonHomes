import React, { useState, useEffect } from "react";
import {
  DollarSign,
  MapPin,
  Type,
  Loader2,
  Image as ImageIcon,
  Video,
  X,
} from "lucide-react";

export default function AddPropertyTab({
  data,
  setData,
  loading,
  editing,
  onSubmit,
  editingProperty, // Add this prop for edit mode
}) {
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load existing images/videos when editing
  useEffect(() => {
    if (editingProperty) {
      // Load existing images from backend URLs
      setImages([]);
      if (editingProperty.images) {
        // Convert image URLs to preview objects (for display only)
        const imagePreviews = editingProperty.images.map((url, index) => ({
          id: index,
          url,
          name: `image_${index + 1}.jpg`,
          isExisting: true,
        }));
        setImages(imagePreviews);
      }

      // Load existing video
      if (editingProperty.video) {
        setVideo({
          name: editingProperty.video.split("/").pop(),
          url: editingProperty.video,
          isExisting: true,
        });
      }
    } else {
      setImages([]);
      setVideo(null);
    }
  }, [editingProperty]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const validImages = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`❌ ${file.name} - Only JPG, PNG, WebP allowed!`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`❌ ${file.name} - Max 5MB per image!`);
        return false;
      }
      return true;
    });

    setImages((prev) => {
      const newImages = [...prev, ...validImages.slice(0, 4 - prev.length)];
      return newImages;
    });
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "video/mp4") {
      alert("❌ Only MP4 videos allowed!");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("❌ Video max 50MB!");
      return;
    }
    setVideo(file);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove video
  const removeVideo = () => {
    setVideo(null);
  };

  // Create FormData for backend submission
  const createFormData = (e) => {
    const formData = new FormData();

    // Form fields
    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("area", data.area);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("category", data.category || "house");

    // New images (File objects only)
    images.forEach((image) => {
      if (!image.isExisting) {
        formData.append("images", image);
      }
    });

    // New video (File object only)
    if (video && !video.isExisting) {
      formData.append("video", video);
    }

    return formData;
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(
      (file) => file.type.startsWith("image/") && !file.type.includes("gif"),
    );

    if (imageFiles.length > 0) {
      handleImageUpload({ target: { files: imageFiles } });
    }
  };

  // Create preview URLs
  const imagePreviews = images.map((file, index) => (
    <div key={file.id || index} className="image-preview">
      <img
        src={file.isExisting ? file.url : URL.createObjectURL(file)}
        alt={`Preview ${index + 1}`}
      />
      <button
        type="button"
        onClick={() => removeImage(index)}
        className="remove-btn"
        title="Remove image"
      >
        <X size={16} />
      </button>
      <span className="file-name">{file.name}</span>
    </div>
  ));

  const videoPreview = video && (
    <div className="video-preview">
      <video
        src={video.isExisting ? video.url : URL.createObjectURL(video)}
        controls
        className="video-player"
        muted
      />
      <button
        type="button"
        onClick={removeVideo}
        className="remove-btn video-remove"
        title="Remove video"
      >
        <X size={16} />
      </button>
      <span className="file-name">{video.name}</span>
    </div>
  );

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.title || !data.location || !data.price || !data.description) {
      alert("❌ Please fill all required fields!");
      return;
    }

    const formData = createFormData(e);

    try {
      await onSubmit(e, formData);
      // Reset form after successful submission
      setImages([]);
      setVideo(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="add-property">
      <div className="form-header">
        <h2>{editing ? "Edit Property" : "Add New Property"}</h2>
        {editingProperty && (
          <span className="property-id">ID: {editingProperty.id}</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-row">
          <div className="form-group">
            <label>
              <Type size={18} /> Property Title{" "}
              <span className="required">*</span>
            </label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter attractive property title"
              required
            />
          </div>
          <div className="form-group">
            <label>
              <MapPin size={18} /> Location <span className="required">*</span>
            </label>
            <input
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              placeholder="City, Sector/Area (e.g., Golf Course Road, Gurgaon)"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <DollarSign size={18} /> Price <span className="required">*</span>
            </label>
            <input
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              placeholder="₹2.5 Cr"
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={data.status}
              onChange={(e) => setData({ ...data, status: e.target.value })}
              className="form-select"
            >
              <option value="active">Active</option>
              <option value="pending">Pending Review</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="form-group full-width">
          <label>
            <ImageIcon size={18} /> Property Images (Max 4)
            {images.length > 0 && ` • ${images.length}/4`}
          </label>
          <div
            className={`upload-zone ${dragging ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              id="images"
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="images" className="upload-label">
              <ImageIcon size={48} />
              <p>
                {images.length === 4
                  ? "Max images reached!"
                  : "Drag & drop images or click to browse"}
              </p>
              <span>Max 4 images • JPG, PNG, WebP • 5MB max each</span>
            </label>
          </div>
          {images.length > 0 && (
            <div className="preview-grid">{imagePreviews}</div>
          )}
        </div>

        {/* VIDEO UPLOAD SECTION */}
        <div className="form-group full-width">
          <label>
            <Video size={18} /> Property Video Tour (Optional)
          </label>
          <div className="upload-zone video-zone">
            <input
              id="video"
              type="file"
              accept="video/mp4"
              onChange={handleVideoUpload}
              className="file-input"
            />
            <label htmlFor="video" className="upload-label">
              <Video size={48} />
              <p>{video ? "Video selected ✓" : "Upload property video tour"}</p>
              <span>MP4 only • Max 50MB</span>
            </label>
          </div>
          {videoPreview}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Bedrooms</label>
            <input
              type="number"
              min="0"
              max="20"
              value={data.bedrooms}
              onChange={(e) => setData({ ...data, bedrooms: e.target.value })}
              placeholder="4"
            />
          </div>
          <div className="form-group">
            <label>Bathrooms</label>
            <input
              type="number"
              min="0"
              max="15"
              value={data.bathrooms}
              onChange={(e) => setData({ ...data, bathrooms: e.target.value })}
              placeholder="3"
            />
          </div>
          <div className="form-group">
            <label>Area (sqft)</label>
            <input
              type="number"
              min="0"
              value={data.area}
              onChange={(e) => setData({ ...data, area: e.target.value })}
              placeholder="2500"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={data.category || "house"}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              className="form-select"
            >
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="penthouse">Penthouse</option>
              <option value="villa">Villa</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea
            rows={8}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Write detailed description including key features, amenities, location benefits, nearby landmarks, transportation, schools, hospitals etc..."
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={
              loading ||
              !data.title ||
              !data.location ||
              !data.price ||
              !data.description
            }
            className="btn-submit"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {editing ? "Updating Property..." : "Adding Property..."}
              </>
            ) : editing ? (
              "💾 Update Property"
            ) : (
              "➕ Add New Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
