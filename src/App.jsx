import { ResumeProvider } from './context/ResumeProvider.jsx'
import { useResumeBuilder } from './hooks/useResumeBuilder.js'
import HomePage from './pages/HomePage.jsx'
import BuilderPage from './pages/BuilderPage.jsx'
import TemplatesPage from './pages/TemplatesPage.jsx'
import ToastMessage from './components/ui/ToastMessage.jsx'
import './App.css'

function AppContent() {
  const { mode, toast } = useResumeBuilder()
  let page = <HomePage />
  if (mode === 'builder') page = <BuilderPage />
  if (mode === 'templates') page = <TemplatesPage />

  return (
    <>
      {page}
      <ToastMessage message={toast} />
    </>
  )
}

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  )
}
