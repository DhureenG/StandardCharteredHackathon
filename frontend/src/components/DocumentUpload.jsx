import React, { useState } from 'react'

const DocumentUpload = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }

  const handleUpload = () => {
    // In a real app, process the files and extract details (e.g. via OCR).
    // Here we simulate by sending the file names and types.
    const documents = selectedFiles.map((file) => ({
      name: file.name,
      type: file.type,
    }))
    onUploadComplete(documents)
  }

  return (
    <div className="document-upload">
      <h2>Upload Documents</h2>
      <p>Please upload your Aadhaar, PAN, or income proof documents.</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <div>
          <h4>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <button onClick={handleUpload}>Submit Documents</button>
        </div>
      )}
    </div>
  )
}

export default DocumentUpload
