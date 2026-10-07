import { useResumeBuilder } from '../../hooks/useResumeBuilder.js';
import Icon from '../ui/Icon.jsx';
import ResumeDocument from '../resume/ResumeDocument.jsx';

export default function PreviewPanel() {
  const { tab, print, resume, setMode } = useResumeBuilder();

  return (
    <section
      className={`preview-panel ${tab === 'edit' ? 'mobile-hide' : ''}`}
    >
      <div className="preview-toolbar">
        <div>
          <strong>Live preview</strong>
          <span className="live-indicator">
            <i /> Up to date
          </span>
        </div>
        <div className="preview-actions">
          <button aria-label="Print preview" onClick={print}>
            <Icon name="print" />
          </button>
        </div>
      </div>
      <div className="paper-stage">
        <div className="paper-scale">
          <ResumeDocument
            resume={resume}
            templateClass={resume.template.toLowerCase()}
          />
        </div>
      </div>
      <div className="preview-bottom">
        <span>
          <Icon name="file" /> A4 · 1 page
        </span>
        <button onClick={() => setMode('templates')}>
          Change template <Icon name="arrow" />
        </button>
      </div>
    </section>
  );
}
