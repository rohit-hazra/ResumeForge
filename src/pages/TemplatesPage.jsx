import { useResumeBuilder } from '../hooks/useResumeBuilder.js';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import ResumeDocument from '../components/resume/ResumeDocument.jsx';
import { templates } from '../data/resume.js';
export default function TemplatesPage() {
const { start, setMode, update, resume } = useResumeBuilder();
return <div className="site-shell mx-auto w-full max-w-[1440px] overflow-hidden bg-paper">
        <SiteHeader start={start} />
        <section className="templates-page">
          <button className="back-link" onClick={() => setMode("home")}>
            <><Icon name="arrowLeft" size={15} /> Back to home</>
          </button>
          <div className="eyebrow">THE COLLECTION</div>
          <h1>
            Good work deserves
            <br />a good first impression.
          </h1>
          <p>Seven considered layouts. One resume that’s entirely yours.</p>
          <div className="template-grid">
            {templates.map(([name, desc]) => (
              <button
                className="template-card"
                key={name}
                onClick={() => {
                  update("template", name);
                  start();
                }}
              >
                <div className="template-thumb">
                  <ResumeDocument
                    resume={resume}
                    templateClass={name.toLowerCase()}
                  />
                </div>
                <b>{name}</b>
                <span>{desc}</span>
                <em>
                  Use this template <Icon name="arrow" />
                </em>
              </button>
            ))}
          </div>
        </section>
      </div>;
}
