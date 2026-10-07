import { defaultSectionOrder, sectionDefinitions } from '../../data/resume.js';
import Icon from '../ui/Icon.jsx';
import { resolveFontFamily } from '../../utils/fontFamilies.js';

const templateAliases = {
  classic: 'centered-classic',
  modern: 'modern-accent',
  minimal: 'minimal',
  fresher: 'ats-standard',
  developer: 'compact-pro',
};

function ResumeDocument({ resume, templateClass }) {
  const personal = resume.personal || {};
  const template = resolveTemplate(templateClass || resume.template);
  const customization = { font: 'DM Sans Variable', fontSize: 10, ...resume.customization };
  const typography = createTypographyVariables(customization.fontSize);
  const sections = getOrderedSections(resume);

  return (
    <article
      className={`resume-page resume-${template}`}
      style={{ fontFamily: resolveFontFamily(customization.font), ...typography }}
    >
      <ResumeHeader personal={personal} template={template} />
      <ResumeLayout sections={sections} resume={resume} template={template} />
    </article>
  );
}

function resolveTemplate(value = '') {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  return templateAliases[normalized] || normalized || 'centered-classic';
}

function getOrderedSections(resume) {
  const definitions = [
    ...sectionDefinitions.filter((section) => section.id !== 'CUSTOM'),
    ...(resume.customSections || []).map((section) => ({
      id: section.id,
      label: section.title || 'Custom section',
      kind: 'customItem',
    })),
  ];

  return (resume.sectionOrder || defaultSectionOrder)
    .filter((id) => id !== 'PERSONAL')
    .map((id) => definitions.find((section) => section.id === id))
    .filter(Boolean);
}

function ResumeHeader({ personal, template }) {
  const photo = personal.includePhoto && personal.photo;

  return (
    <header className="resume-head">
      {photo && (
        <img
          className="resume-photo"
          src={personal.photo}
          alt=""
          style={{ objectPosition: `50% ${personal.photoPosition ?? 50}%` }}
        />
      )}
      <div className="resume-identity">
        {personal.name && <h2>{personal.name}</h2>}
        {personal.role && <p className="resume-role">{personal.role}</p>}
      </div>
      {template !== 'sidebar-pro' && <ResumeContact personal={personal} />}
      {template === 'modern-accent' && <span className="resume-accent-rule" />}
    </header>
  );
}

function ResumeContact({ personal }) {
  const contactDetails = [
    { type: 'email', value: personal.email, icon: 'mail' },
    { type: 'phone', value: personal.phone, icon: 'phone' },
    { type: 'github', value: personal.github, icon: 'github' },
    { type: 'linkedin', value: personal.linkedin, icon: 'linkedin' },
    { type: 'location', value: personal.location, icon: 'pin' },
    { type: 'website', value: personal.website, icon: 'globe' },
  ].filter((detail) => detail.value);

  if (contactDetails.length === 0) return null;

  return (
    <div className="resume-contact">
      {contactDetails.map(({ type, value, icon }) => (
        <span className="resume-contact-item" key={type}>
          <Icon name={icon} size={10} className="icon resume-contact-icon" />
          <span>{value}</span>
        </span>
      ))}
    </div>
  );
}

function ResumeLayout({ sections, resume, template }) {
  const layouts = {
    'centered-classic': CenteredClassicLayout,
    'ats-standard': AtsStandardLayout,
    'modern-split': ModernSplitLayout,
    'sidebar-pro': SidebarProLayout,
    minimal: MinimalLayout,
    'modern-accent': ModernAccentLayout,
    'compact-pro': CompactProLayout,
  };
  const Layout = layouts[template] || CenteredClassicLayout;
  return <Layout sections={sections} resume={resume} />;
}

function CenteredClassicLayout({ sections, resume }) {
  return <ResumeSectionList sections={sections} resume={resume} />;
}

function AtsStandardLayout({ sections, resume }) {
  return <ResumeSectionList sections={sections} resume={resume} />;
}

function MinimalLayout({ sections, resume }) {
  return <ResumeSectionList sections={sections} resume={resume} />;
}

function ModernAccentLayout({ sections, resume }) {
  return <ResumeSectionList sections={sections} resume={resume} />;
}

function ModernSplitLayout({ sections, resume }) {
  const sideSections = takeSections(sections, ['SUMMARY', 'SKILLS', 'LANGUAGES']);
  const mainSections = sections.filter((section) => !sideSections.includes(section));
  return (
    <div className="resume-columns resume-columns-modern-split">
      <aside className="resume-column resume-side-column">
        <ResumeSectionList sections={sideSections} resume={resume} />
      </aside>
      <div className="resume-column resume-main-column">
        <ResumeSectionList sections={mainSections} resume={resume} />
      </div>
    </div>
  );
}

function SidebarProLayout({ sections, resume }) {
  const sideSections = takeSections(sections, ['SKILLS', 'LANGUAGES', 'INTERESTS']);
  const mainSections = sections.filter((section) => !sideSections.includes(section));
  return (
    <div className="resume-columns resume-columns-sidebar-pro">
      <aside className="resume-column resume-side-column">
        <h3 className="resume-contact-heading">CONTACT</h3>
        <ResumeContact personal={resume.personal || {}} />
        <ResumeSectionList sections={sideSections} resume={resume} />
      </aside>
      <div className="resume-column resume-main-column">
        <ResumeSectionList sections={mainSections} resume={resume} />
      </div>
    </div>
  );
}

function CompactProLayout({ sections, resume }) {
  const leftSections = takeSections(sections, ['EXPERIENCE', 'INTERNSHIPS', 'PROJECTS']);
  const rightSections = sections.filter((section) => !leftSections.includes(section));
  return (
    <>
      <ResumeSectionList
        sections={takeSections(sections, ['SUMMARY'])}
        resume={resume}
        className="resume-compact-summary"
      />
      <div className="resume-columns resume-columns-compact-pro">
        <div className="resume-column resume-main-column">
          <ResumeSectionList sections={leftSections} resume={resume} />
        </div>
        <aside className="resume-column resume-side-column">
          <ResumeSectionList sections={rightSections} resume={resume} />
        </aside>
      </div>
    </>
  );
}

function takeSections(sections, ids) {
  return sections.filter((section) => ids.includes(section.id));
}

function ResumeSectionList({ sections, resume, className = '' }) {
  return (
    <div className={className}>
      {sections.filter((section) => hasSectionContent(section, resume)).map((section) => (
        <ResumeSection key={section.id} section={section} resume={resume} />
      ))}
    </div>
  );
}

function hasSectionContent(section, resume) {
  if (section.kind === 'summary') return Boolean(resume.summary?.trim());
  if (section.kind === 'skills') return Boolean(resume.skills?.trim());
  if (section.kind === 'interests') return Boolean(resume.interests?.trim());
  if (section.kind === 'customItem') {
    return Boolean(resume.customSections?.find((item) => item.id === section.id)?.items?.some((item) => item.trim()));
  }
  if (!section.dataKey) return false;

  return (resume[section.dataKey] || []).some((entry) =>
    Object.values(entry || {}).some((value) =>
      Array.isArray(value)
        ? value.some((item) => String(item).trim())
        : String(value ?? '').trim()
    )
  );
}

function ResumeSection({ section, resume }) {
  return (
    <section className={`resume-section resume-section-${section.id.toLowerCase()}`}>
      <h3>{section.label}</h3>
      {section.kind === 'summary' && resume.summary && <p>{resume.summary}</p>}
      {section.dataKey && (
        <ResumeEntries section={section} items={resume[section.dataKey] || []} />
      )}
      {section.kind === 'skills' && resume.skills && <p>{resume.skills}</p>}
      {section.kind === 'interests' && resume.interests && <p>{resume.interests}</p>}
      {section.kind === 'customItem' && (
        <ResumeEntries
          section={section}
          items={resume.customSections?.find((item) => item.id === section.id)?.items || []}
        />
      )}
    </section>
  );
}

function ResumeEntries({ section, items }) {
  if (section.kind === 'customItem') {
    return (
      <ul className="custom-resume-items">
        {items.filter(Boolean).map((item, index) => <li key={`${section.id}-${index}`}>{item}</li>)}
      </ul>
    );
  }

  return items.map((item, index) => (
    <div className="resume-item" key={`${section.id}-${index}`}>
      <div className="resume-item-top">
        <b>{item.role || item.degree || item.name || item.title || section.label}</b>
        <span>{item.dates || item.date}</span>
      </div>
      <div className="resume-subline">
        {item.company || item.school || item.organization || item.publisher || item.location || item.proficiency || item.technologies || item.url}
      </div>
      {(item.description || item.detail || item.items) && (
        <div className="resume-item-description">
          {Array.isArray(item.items) ? (
            <ul>{item.items.filter(Boolean).map((line, lineIndex) => <li key={lineIndex}>{line}</li>)}</ul>
          ) : item.description ? (
            <ul>{item.description.split('\n').filter(Boolean).map((line, lineIndex) => <li key={lineIndex}>{line}</li>)}</ul>
          ) : (
            <p>{item.detail}</p>
          )}
        </div>
      )}
      {item.technologies && section.id !== 'PROJECTS' && (
        <div className="resume-subline">{item.technologies}</div>
      )}
    </div>
  ));
}

function createTypographyVariables(fontSize) {
  const scale = fontSize / 10;
  const px = (size) => `${size * scale}px`;
  const pt = (size) => `${size * fontSize}pt`;

  return {
    '--resume-main-size': px(7),
    '--resume-heading-size': px(19),
    '--resume-role-size': px(9),
    '--resume-contact-size': px(6.4),
    '--resume-section-size': px(7.5),
    '--resume-entry-size': px(7.5),
    '--resume-meta-size': px(6),
    '--resume-subline-size': px(6.3),
    '--resume-paper-main-size': px(8),
    '--resume-paper-heading-size': px(22),
    '--resume-paper-role-size': px(10),
    '--resume-paper-contact-size': px(7.2),
    '--resume-paper-section-size': px(8),
    '--resume-paper-entry-size': px(8),
    '--resume-paper-meta-size': px(7),
    '--resume-print-main-size': pt(1),
    '--resume-print-heading-size': pt(2.2),
    '--resume-print-role-size': pt(1.1),
    '--resume-print-contact-size': pt(0.8),
    '--resume-print-section-size': pt(0.9),
    '--resume-print-entry-size': pt(0.9),
    '--resume-print-meta-size': pt(0.8),
  };
}

export default ResumeDocument;
