import React, { useState } from 'react'
import VideoAssistant from './components/VideoAssistant'
import DocumentUpload from './components/DocumentUpload'
import EligibilityCheck from './components/EligibilityCheck'

function App() {
  const [step, setStep] = useState(1)
  const [userResponses, setUserResponses] = useState({})
  const [uploadedDocuments, setUploadedDocuments] = useState([])

  const handleVideoResponse = (response) => {
    setUserResponses({ ...userResponses, videoResponse: response })
    setStep(2)
  }

  const handleDocumentsUpload = (docs) => {
    setUploadedDocuments(docs)
    setStep(3)
  }

  return (
    <div className="app-container">
      <h1>Digital Loan Application</h1>
      {step === 1 && <VideoAssistant onComplete={handleVideoResponse} />}
      {step === 2 && <DocumentUpload onUploadComplete={handleDocumentsUpload} />}
      {step === 3 && (
        <EligibilityCheck
          userResponses={userResponses}
          documents={uploadedDocuments}
        />
      )}
    </div>
  )
}

export default App