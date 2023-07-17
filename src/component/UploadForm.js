import React, { useState } from "react";
import axios from "axios";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import "./styles.css";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["application/pdf"];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please select a valid PDF file.");
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      axios
        .post("/api/upload", formData)
        .then((response) => {
          setUploadStatus("File uploaded successfully!");
          setError("");
        })
        .catch((error) => {
          setUploadStatus("");
          setError("File upload failed. Please try again.");
        });
    } else {
      setError("Please select a PDF file before uploading.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>OCR PWA - E-bill PDF Upload</h1>
      </div>
      <div className="file-input">
        <label htmlFor="pdfFile">Select a PDF file:</label>
        <input type="file" id="pdfFile" onChange={handleFileChange} />
      </div>
      {error && <div className="error-message">{error}</div>}
      {uploadStatus && <div className="status-message">{uploadStatus}</div>}
      {selectedFile && (
        <div className="pdf-preview">
          <PDFViewer width="100%" height="100%">
            <PDFDownloadLink document={`path/to/your/api/${selectedFile.name}`}>
              {({ loading }) => (loading ? "Loading..." : "View PDF")}
            </PDFDownloadLink>
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
