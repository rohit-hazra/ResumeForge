import { useResumeBuilder } from '../../hooks/useResumeBuilder.js';
import Icon from '../ui/Icon.jsx';
import { DynamicSectionEditor, CustomSectionEditor } from '../resume/EditorFields.jsx';
import PersonalInformationForm from './PersonalInformationForm.jsx';
export default function ResumeEditorPanel() {
const { tab, orderedSections, active, setActive, resume, update, notify } = useResumeBuilder();
return <section
            className={`editor-panel relative overflow-auto bg-white ${
              tab === "preview" ? "mobile-hide" : ""
            }`}
          >
            <div className="editor-heading">
              <div>
                <div className="eyebrow">
                  SECTION{" "}
                  {String(
                    orderedSections.findIndex((s) => s.id === active) + 1
                  ).padStart(2, "0")}{" "}
                  OF {String(orderedSections.length).padStart(2, "0")}
                </div>
                <h1>{orderedSections.find((s) => s.id === active)?.label}</h1>
                <p>
                  Make it yours. Your changes appear in the preview as you type.
                </p>
              </div>
              <div className="step-control">
                <button
                  aria-label="Previous section"
                  onClick={() =>
                    setActive(
                      orderedSections[
                        Math.max(
                          0,
                          orderedSections.findIndex((s) => s.id === active) - 1
                        )
                      ]?.id || active
                    )
                  }
                >
                  <Icon name="arrowLeft" size={15} />
                </button>
                <button
                  aria-label="Next section"
                  onClick={() =>
                    setActive(
                      orderedSections[
                        Math.min(
                          orderedSections.length - 1,
                          orderedSections.findIndex((s) => s.id === active) + 1
                        )
                      ]?.id || active
                    )
                  }
                >
                  <Icon name="arrowRight" size={15} />
                </button>
              </div>
            </div>
            {active === "PERSONAL" && <PersonalInformationForm />}
            {active === "SUMMARY" && (
              <>
                <div className="field full">
                  <label htmlFor="summary">Professional summary</label>
                  <textarea
                    id="summary"
                    rows="7"
                    value={resume.summary}
                    onChange={(e) => update("summary", e.target.value)}
                    placeholder="A few sentences about your experience and what you do best."
                  />
                  <small className="field-hint">
                    Aim for 2–4 sentences that sound like you.
                  </small>
                </div>
                <button
                  className="ai-button"
                  onClick={() =>
                    notify("AI writing needs a Gemini API key on the server")
                  }
                >
                  <Icon name="spark" /> Improve with AI <span>Coming soon</span>
                </button>
              </>
            )}
            {orderedSections.find((section) => section.id === active)
              ?.dataKey && (
              <DynamicSectionEditor
                section={orderedSections.find(
                  (section) => section.id === active
                )}
                items={
                  resume[
                    orderedSections.find((section) => section.id === active)
                      .dataKey
                  ] || []
                }
                onChange={(items) =>
                  update(
                    orderedSections.find((section) => section.id === active)
                      .dataKey,
                    items
                  )
                }
              />
            )}
            {active === "SKILLS" && (
              <div className="field full">
                <label htmlFor="skills">Skills</label>
                <textarea
                  id="skills"
                  rows="6"
                  value={resume.skills || ""}
                  onChange={(e) => update("skills", e.target.value)}
                  placeholder="Add skills separated by commas"
                />
                <small className="field-hint">
                  Separate each skill with a comma.
                </small>
                <div className="skill-chips">
                  {resume.skills
                    .split(",")
                    .filter(Boolean)
                    .map((s) => (
                      <span key={s}>{s.trim()}</span>
                    ))}
                </div>
              </div>
            )}
            {active === "INTERESTS" && (
              <div className="field full">
                <label htmlFor="interests">Interests</label>
                <textarea
                  id="interests"
                  rows="4"
                  value={resume.interests || ""}
                  onChange={(e) => update("interests", e.target.value)}
                  placeholder="Add interests separated by commas"
                />
              </div>
            )}
            {active.startsWith("CUSTOM_") && (
              <CustomSectionEditor
                section={resume.customSections.find(
                  (item) => item.id === active
                )}
                customSections={resume.customSections}
                onChange={(customSections) =>
                  update("customSections", customSections)
                }
              />
            )}
            <div className="editor-footer">
              <span>Changes save automatically</span>
              <button
                className="button primary"
                onClick={() => {
                  setActive(
                    orderedSections[
                      Math.min(
                        orderedSections.length - 1,
                        orderedSections.findIndex((s) => s.id === active) + 1
                      )
                    ]?.id || active
                  );
                  window.scrollTo(0, 0);
                }}
              >
                Continue <Icon name="arrow" />
              </button>
            </div>
          </section>;
}
