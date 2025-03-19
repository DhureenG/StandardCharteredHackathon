import React from 'react'

const EligibilityCheck = ({ userResponses, documents }) => {
  // Simulated rule-based eligibility logic.
  // For example, if a document name includes "income", we approve the loan.
  let eligibilityStatus = '🔄 More Info Needed'
  let reason = ''

  if (userResponses.videoResponse && documents.length > 0) {
    const incomeDoc = documents.find((doc) =>
      doc.name.toLowerCase().includes('income')
    )
    if (incomeDoc) {
      eligibilityStatus = '✅ Approved'
    } else {
      eligibilityStatus = '❌ Rejected'
      reason = 'Income proof document missing.'
    }
  } else {
    eligibilityStatus = '🔄 More Info Needed'
  }

  return (
    <div className="eligibility-check">
      <h2>Loan Eligibility Result</h2>
      <p>Status: {eligibilityStatus}</p>
      {reason && <p>Reason: {reason}</p>}
    </div>
  )
}

export default EligibilityCheck
