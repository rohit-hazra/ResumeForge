import { useResumeBuilder } from '../../hooks/useResumeBuilder.js'
import Icon from '../ui/Icon.jsx'
import FormField from '../ui/FormField.jsx'

export default function PersonalInformationForm() {
  const { resume, update, notify } = useResumeBuilder()
  const Field = FormField
  return <>
                <div className="form-grid">
                  <Field
                    label="Full name"
                    value={resume.personal.name}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, name: v })
                    }
                    placeholder="Your name"
                  />
                  <Field
                    label="Professional title"
                    value={resume.personal.role}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, role: v })
                    }
                    placeholder="e.g. Product Designer"
                  />
                  <Field
                    label="Email address"
                    value={resume.personal.email}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, email: v })
                    }
                    placeholder="you@example.com"
                  />
                  <Field
                    label="Phone"
                    value={resume.personal.phone}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, phone: v })
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                  <Field
                    label="Location"
                    value={resume.personal.location}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, location: v })
                    }
                    placeholder="City, Country"
                  />
                  <Field
                    label="LinkedIn"
                    value={resume.personal.linkedin}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, linkedin: v })
                    }
                    placeholder="linkedin.com/in/you"
                  />
                  <Field
                    label="GitHub"
                    value={resume.personal.github}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, github: v })
                    }
                    placeholder="github.com/you"
                  />
                  <Field
                    label="Website"
                    value={resume.personal.website}
                    onChange={(v) =>
                      update("personal", { ...resume.personal, website: v })
                    }
                    placeholder="yourwebsite.com"
                  />
                </div>
                <div className="photo-row">
                  <div className="photo-symbol">
                    {resume.personal.photo ? (
                      <img
                        src={resume.personal.photo}
                        alt="Profile"
                        style={{
                          objectPosition: `50% ${
                            resume.personal.photoPosition ?? 50
                          }%`,
                        }}
                      />
                    ) : (
                      <Icon name="user" size={24} />
                    )}
                  </div>
                  <div className="photo-copy">
                    <b>
                      Profile photo <span>Optional</span>
                    </b>
                    <p>JPG or PNG · Up to 2 MB</p>
                  </div>
                  <label className="button outline upload-button">
                    {resume.personal.photo ? "Replace photo" : "Add a photo"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files[0];
                        if (!f) return;
                        if (f.size > 2 * 1024 * 1024) {
                          notify("Choose an image smaller than 2 MB");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = () =>
                          update("personal", {
                            ...resume.personal,
                            photo: reader.result,
                          });
                        reader.readAsDataURL(f);
                      }}
                    />
                  </label>
                  {resume.personal.photo && (
                    <button
                      className="text-action"
                      onClick={() =>
                        update("personal", { ...resume.personal, photo: "" })
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label
                  className={`photo-toggle ${
                    !resume.personal.photo ? "disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!resume.personal.photo}
                    checked={resume.personal.includePhoto}
                    onChange={(e) =>
                      update("personal", {
                        ...resume.personal,
                        includePhoto: e.target.checked,
                      })
                    }
                  />{" "}
                  Include photo in resume{" "}
                  <span>
                    {resume.personal.photo
                      ? "Shown in supported templates"
                      : "Add a photo to enable this option"}
                  </span>
                </label>
                {resume.personal.photo && (
                  <label className="photo-position">
                    Adjust photo crop{" "}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={resume.personal.photoPosition ?? 50}
                      onChange={(e) =>
                        update("personal", {
                          ...resume.personal,
                          photoPosition: Number(e.target.value),
                        })
                      }
                    />
                  </label>
                )}
                <div className="tip">
                  <span>
                    <Icon name="spark" />
                  </span>
                  <p>
                    <b>A quick note on photos</b>
                    <br />
                    Photos are optional. Most ATS-friendly resumes work well
                    without one.
                  </p>
                </div>
              </>
}
