import SectionSidebar from './SectionSidebar.jsx';
import ResumeEditorPanel from './ResumeEditorPanel.jsx';
import PreviewPanel from './PreviewPanel.jsx';
export default function BuilderWorkspace() { return <div className="builder-body grid min-h-0 flex-1 grid-cols-[218px_minmax(365px,.92fr)_minmax(450px,1.08fr)] max-[760px]:block">
          <SectionSidebar />
          <ResumeEditorPanel />
          <PreviewPanel />
        </div>; }
