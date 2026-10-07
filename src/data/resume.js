export const initialResume = {
  title: "",
  template: "Centered Classic",
  customization: { font: "DM Sans Variable", fontSize: 10 },
  personal: {
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    photo: "",
    includePhoto: false,
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  internships: [],
  certifications: [],
  achievements: [],
  languages: [],
  publications: [],
  volunteering: [],
  awards: [],
  skills: "",
  interests: "",
};

export const sectionDefinitions = [
  { id: "PERSONAL", label: "Personal information", kind: "personal" },
  { id: "SUMMARY", label: "Professional summary", kind: "summary" },
  {
    id: "EXPERIENCE",
    label: "Experience",
    dataKey: "experience",
    fields: [
      ["Job title", "role"],
      ["Company", "company"],
      ["Location", "location"],
      ["Dates", "dates"],
    ],
    descriptionLabel: "Highlights",
  },
  {
    id: "EDUCATION",
    label: "Education",
    dataKey: "education",
    fields: [
      ["Degree", "degree"],
      ["Institution", "school"],
      ["Location", "location"],
      ["Dates", "dates"],
      ["Additional detail", "detail"],
    ],
  },
  {
    id: "PROJECTS",
    label: "Projects",
    dataKey: "projects",
    fields: [
      ["Project name", "name"],
      ["Technologies", "technologies"],
    ],
    descriptionLabel: "Description",
  },
  { id: "SKILLS", label: "Skills", kind: "skills" },
  {
    id: "INTERNSHIPS",
    label: "Internships",
    dataKey: "internships",
    fields: [
      ["Role", "role"],
      ["Organization", "company"],
      ["Location", "location"],
      ["Dates", "dates"],
    ],
    descriptionLabel: "Highlights",
  },
  {
    id: "CERTIFICATIONS",
    label: "Certifications",
    dataKey: "certifications",
    fields: [
      ["Certification", "name"],
      ["Organization", "organization"],
      ["Date", "date"],
      ["Credential ID", "credentialId"],
      ["Credential URL", "url"],
    ],
  },
  {
    id: "ACHIEVEMENTS",
    label: "Achievements",
    dataKey: "achievements",
    fields: [
      ["Achievement", "name"],
      ["Date", "date"],
    ],
    descriptionLabel: "Details",
  },
  {
    id: "LANGUAGES",
    label: "Languages",
    dataKey: "languages",
    fields: [
      ["Language", "name"],
      ["Proficiency", "proficiency"],
    ],
  },
  {
    id: "PUBLICATIONS",
    label: "Publications",
    dataKey: "publications",
    fields: [
      ["Title", "name"],
      ["Publisher", "publisher"],
      ["Date", "date"],
      ["URL", "url"],
    ],
    descriptionLabel: "Description",
  },
  {
    id: "VOLUNTEERING",
    label: "Volunteer experience",
    dataKey: "volunteering",
    fields: [
      ["Role", "role"],
      ["Organization", "company"],
      ["Location", "location"],
      ["Dates", "dates"],
    ],
    descriptionLabel: "Highlights",
  },
  {
    id: "AWARDS",
    label: "Awards",
    dataKey: "awards",
    fields: [
      ["Award", "name"],
      ["Organization", "organization"],
      ["Date", "date"],
    ],
    descriptionLabel: "Details",
  },
  { id: "INTERESTS", label: "Interests", kind: "interests" },
  { id: "CUSTOM", label: "Custom section", kind: "custom" },
];

export const defaultSectionOrder = [
  "PERSONAL",
  "SUMMARY",
  "EXPERIENCE",
  "EDUCATION",
  "PROJECTS",
  "SKILLS",
];

export const templates = [
  ["Centered Classic", "A centered header and refined single column"],
  ["ATS Standard", "A clear, left-aligned format built for scanning"],
  ["Modern Split", "A balanced 30/70 two-column composition"],
  ["Sidebar Pro", "Contact and skills in a subtle shaded sidebar"],
  ["Minimal", "Open spacing and typography-led hierarchy"],
  ["Modern Accent", "A contemporary layout with restrained color"],
  ["Compact Pro", "A space-efficient layout for fuller resumes"],
];

export const emptyForSection = (section) =>
  section.id === "CUSTOM"
    ? { title: "", items: [] }
    : section.dataKey === "languages"
    ? { name: "", proficiency: "" }
    : section.dataKey === "certifications"
    ? { name: "", organization: "", date: "", credentialId: "", url: "" }
    : section.dataKey === "education"
    ? { degree: "", school: "", location: "", dates: "", detail: "" }
    : section.dataKey === "projects"
    ? { name: "", detail: "", technologies: "" }
    : {
        name: "",
        role: "",
        company: "",
        location: "",
        dates: "",
        description: "",
      };
