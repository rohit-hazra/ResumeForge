import Icon from '../ui/Icon.jsx';
import FormField from '../ui/FormField.jsx';
import { emptyForSection } from '../../data/resume.js';
export function DynamicSectionEditor({ section, items, onChange }) {
  return (
    <>
      {items.map((item, index) => (
        <div className="entry-card" key={`${section.id}-${index}`}>
          <div className="entry-title">
            <b>
              {item.role ||
                item.degree ||
                item.name ||
                `${section.label} ${index + 1}`}
            </b>
            <button
              aria-label={`Remove ${section.label} entry`}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Icon name="trash" size={15} />
            </button>
          </div>
          <div className="form-grid">
            {section.fields.map(([label, key]) => (
              <FormField
                key={key}
                label={label}
                value={item[key]}
                placeholder={getFieldPlaceholder(section, key)}
                onChange={(value) =>
                  onChange(
                    items.map((entry, i) =>
                      i === index ? { ...entry, [key]: value } : entry
                    )
                  )
                }
              />
            ))}
          </div>
          {section.descriptionLabel && (
            <div className="field full">
              <label>{section.descriptionLabel}</label>
              <textarea
                rows="4"
                value={item.description || item.detail || ""}
                placeholder={getDescriptionPlaceholder(section.descriptionLabel)}
                onChange={(e) =>
                  onChange(
                    items.map((entry, i) =>
                      i === index
                        ? {
                            ...entry,
                            [item.description !== undefined
                              ? "description"
                              : "detail"]: e.target.value,
                          }
                        : entry
                    )
                  )
                }
              />
            </div>
          )}
        </div>
      ))}
      <button
        className="add-entry"
        onClick={() => onChange([...items, emptyForSection(section)])}
      >
        <Icon name="plus" /> Add {section.label.toLowerCase().replace(/s$/, "")}
      </button>
    </>
  );
}
export function CustomSectionEditor({ section, customSections, onChange }) {
  if (!section) return null;
  const patch = (changes) =>
    onChange(
      customSections.map((item) =>
        item.id === section.id ? { ...item, ...changes } : item
      )
    );
  return (
    <>
      <FormField
        label="Section title"
        value={section.title}
        placeholder="e.g. Leadership"
        onChange={(title) => patch({ title })}
      />
      <div className="field full">
        <label>Items</label>
        <textarea
          rows="7"
          value={section.items.join("\n")}
          placeholder="Add one item per line"
          onChange={(e) => patch({ items: e.target.value.split("\n") })}
        />
        <small className="field-hint">
          Each line appears as a separate bullet in your resume.
        </small>
      </div>
    </>
  );
}

function getFieldPlaceholder(section, key) {
  if (key === 'name') {
    const examples = {
      PROJECTS: 'e.g. Portfolio redesign',
      CERTIFICATIONS: 'e.g. AWS Certified Developer',
      ACHIEVEMENTS: 'e.g. Employee of the Year',
      LANGUAGES: 'e.g. Spanish',
      PUBLICATIONS: 'e.g. Article or paper title',
      AWARDS: 'e.g. Design Excellence Award',
    };
    return examples[section.id] || `Enter ${section.label.toLowerCase()}`;
  }

  const examples = {
    role: 'e.g. Product Designer',
    degree: 'e.g. BSc Computer Science',
    company: 'Company or organization',
    school: 'School or university',
    location: 'City, Country',
    dates: 'e.g. 2022 – Present',
    technologies: 'e.g. React, TypeScript',
    organization: 'Organization name',
    date: 'e.g. 2024',
    credentialId: 'Credential ID',
    url: 'https://example.com',
    proficiency: 'e.g. Fluent',
    publisher: 'Publisher name',
  };
  return examples[key] || `Enter ${section.fields.find((field) => field[1] === key)?.[0]?.toLowerCase() || 'details'}`;
}

function getDescriptionPlaceholder(label) {
  if (label === 'Highlights') return 'Add accomplishments or responsibilities, one per line.';
  if (label === 'Details') return 'Add relevant details or results.';
  return 'Describe the work, outcome, or impact.';
}
