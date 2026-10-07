import { useResumeBuilder } from '../../hooks/useResumeBuilder.js';
import Icon from '../ui/Icon.jsx';
import { sectionDefinitions } from '../../data/resume.js';
export default function SectionSidebar() {
const { tab, orderedSections, active, setActive, setTab, moveSection, removeSection, showAddSection, setShowAddSection, resume, addSection } = useResumeBuilder();
return <aside
            className={`editor-nav ${tab === "preview" ? "mobile-hide" : ""}`}
          >
            <div className="nav-label">YOUR RESUME</div>
            {orderedSections.map((section, i) => (
              <div
                key={section.id}
                className={`section-link-wrap ${
                  active === section.id ? "selected" : ""
                }`}
              >
                <button
                  className="section-link"
                  title={section.id === 'PERSONAL' ? 'Personal Information stays at the top' : undefined}
                  onClick={() => {
                    setActive(section.id);
                    setTab("edit");
                  }}
                >
                  <span className="section-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.label}
                  {active === section.id && <span className="nav-dot" />}
                </button>
                <span className="reorder-controls">
                  <button
                    aria-label={`Move ${section.label} up`}
                    disabled={section.id === 'PERSONAL' || i === 0}
                    onClick={() => moveSection(section.id, -1)}
                  >
                    <Icon name="arrowUp" size={12} />
                  </button>
                  <button
                    aria-label={`Move ${section.label} down`}
                    disabled={section.id === 'PERSONAL' || i === orderedSections.length - 1}
                    onClick={() => moveSection(section.id, 1)}
                  >
                    <Icon name="arrowDown" size={12} />
                  </button>
                  {section.id !== 'PERSONAL' && (
                    <button
                      className="remove-section"
                      aria-label={`Remove ${section.label} section`}
                      title={`Remove ${section.label}`}
                      onClick={() => removeSection(section.id)}
                    >
                      <Icon name="trash" size={13} />
                    </button>
                  )}
                </span>
              </div>
            ))}
            <div className="nav-rule" />
            <button
              className="add-section"
              onClick={() => setShowAddSection(!showAddSection)}
            >
              <Icon name="plus" /> Add a section
            </button>
            {showAddSection && (
              <div className="section-picker">
                {[
                  ...sectionDefinitions.filter(
                    (section) => section.id === "CUSTOM" || !resume.sectionOrder.includes(section.id)
                  ),
                  ...resume.customSections
                    .filter((section) => !resume.sectionOrder.includes(section.id))
                    .map((section) => ({ id: section.id, label: section.title })),
                ]
                  .map((section) => (
                    <button
                      key={section.id}
                      onClick={() => addSection(section.id)}
                    >
                      {section.label}
                      <Icon name="plus" size={13} />
                    </button>
                  ))}
              </div>
            )}
            <div className="nav-bottom">
              <span className="nav-avatar">J</span>
              <span>
                <b>Guest workspace</b>
                <small>Your resume stays on this device</small>
              </span>
            </div>
          </aside>;
}
