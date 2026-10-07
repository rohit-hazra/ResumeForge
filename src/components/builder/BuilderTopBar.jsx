import { useResumeBuilder } from '../../hooks/useResumeBuilder.js';
import Icon from '../ui/Icon.jsx';
import { resolveFontFamily } from '../../utils/fontFamilies.js';
export default function BuilderTopBar() {
  const { setMode, resume, update, saved, tab, setTab, print } = useResumeBuilder();
  return <header className="builder-top sticky top-0 z-20">
    <button className="brand" onClick={() => setMode("home")}>
      <span className="brand-mark">R</span> ResumeForge
    </button>
    <div className="doc-name">
      <input
        aria-label="Resume name"
        value={resume.title}
        placeholder="Name your resume"
        placeholder="Name your resume"
        onChange={(e) => update("title", e.target.value)}
      />
      <span className="save-state">
        <i className={saved ? "is-saved" : ""} />
        {saved ? "Saved just now" : "Saving…"}
      </span>
    </div>
    <div className="top-actions">
      <button
        className="quiet-button"
        onClick={() => setMode("templates")}
      >
        <Icon name="grid" /> Template
      </button>
      <details className="type-settings">
        <summary aria-label="Font and size settings" title="Font and size">
          <b>Aa</b><span>Type</span>
        </summary>
        <div className="type-settings-popover">
          <label>
            Font family
            <select
              value={resolveFontFamily(resume.customization.font)}
              style={{ fontFamily: resolveFontFamily(resume.customization.font) }}
              onChange={(event) => update('customization', {
                ...resume.customization,
                font: event.target.value,
              })}
            >
              <optgroup label="Sans Serif">
                <option value="DM Sans Variable">DM Sans</option>
                <option value="Inter Variable">Inter</option>
                <option value="Roboto Flex Variable">Roboto Flex</option>
                <option value="Source Sans 3">Source Sans 3</option>
                <option value="IBM Plex Sans Variable">IBM Plex Sans</option>
              </optgroup>

              <optgroup label="Serif">
                <option value="Lora Variable">Lora</option>
                <option value="Merriweather Variable">Merriweather</option>
                <option value="Times New Roman">Times New Roman</option>
              </optgroup>
            </select>
          </label>
          <label>
            Font size
            <select
              value={resume.customization.fontSize}
              onChange={(event) => update('customization', {
                ...resume.customization,
                fontSize: Number(event.target.value),
              })}
            >
              <option value={9}>Compact</option>
              <option value={10}>Standard</option>
              <option value={11}>Comfortable</option>
              <option value={12}>Large</option>
              <option value={13}>Extra Large</option>
            </select>
          </label>
        </div>
      </details>
      <button
        className="quiet-button"
        onClick={() => setTab(tab === "edit" ? "preview" : "edit")}
      >
        <Icon name="eye" /> Preview
      </button>
      <button
        className="button primary small focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        onClick={print}
      >
        <Icon name="download" /> Download PDF
      </button>
    </div>
  </header>;
}
