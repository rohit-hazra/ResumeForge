import { useContext } from 'react'
import { ResumeContext } from '../context/ResumeContext.js'

export function useResumeBuilder() {
  const context = useContext(ResumeContext)
  if (!context) throw new Error('useResumeBuilder must be used inside ResumeProvider')
  return context
}
