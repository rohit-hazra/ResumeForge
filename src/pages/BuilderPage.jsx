import BuilderTopBar from '../components/builder/BuilderTopBar.jsx'
import MobileBuilderTabs from '../components/builder/MobileBuilderTabs.jsx'
import BuilderWorkspace from '../components/builder/BuilderWorkspace.jsx'

export default function BuilderPage() {
  return (
    <main className="builder-shell flex flex-col text-slate-800">
      <BuilderTopBar />
      <MobileBuilderTabs />
      <BuilderWorkspace />
    </main>
  )
}
