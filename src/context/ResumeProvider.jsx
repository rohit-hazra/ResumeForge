import { useEffect, useState } from 'react'
import { initialResume, defaultSectionOrder, sectionDefinitions } from '../data/resume.js'
import { ResumeContext } from './ResumeContext.js'

function pinPersonalFirst(order) {
  return ['PERSONAL', ...order.filter((id) => id !== 'PERSONAL')]
}

function removeStarterContent(resume) {
  if (!resume || typeof resume !== 'object') return resume
  const personal = { ...resume.personal }
  const starterPersonal = {
    name: 'Jordan Lee',
    role: 'Product Designer',
    email: 'jordan.lee@email.com',
    phone: '+1 (415) 555-0142',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/jordanlee',
    website: 'jordanlee.design',
  }
  Object.entries(starterPersonal).forEach(([key, value]) => {
    if (personal[key] === value) personal[key] = ''
  })

  const cleanEntries = (key, isStarterEntry) =>
    Array.isArray(resume[key]) ? resume[key].filter((entry) => !isStarterEntry(entry)) : resume[key]
  const starterSummary = 'Product designer with 6 years of experience creating clear, thoughtful digital products. I partner closely with engineering and research to turn complex problems into simple experiences that work for people.'
  const starterSkills = 'Product strategy, UX research, Interaction design, Figma, Prototyping, Design systems'

  return {
    ...resume,
    title: resume.title === 'My Resume' ? '' : resume.title,
    personal,
    summary: resume.summary === starterSummary ? '' : resume.summary,
    skills: resume.skills === starterSkills ? '' : resume.skills,
    experience: cleanEntries('experience', (entry) =>
      (entry.role === 'Senior Product Designer' && entry.company === 'Northstar') ||
      (entry.role === 'Product Designer' && entry.company === 'Fieldwork')
    ),
    education: cleanEntries('education', (entry) =>
      entry.degree === 'BFA, Interaction Design' && entry.school === 'California College of the Arts'
    ),
    projects: cleanEntries('projects', (entry) => entry.name === 'Common Ground'),
  }
}

export function ResumeProvider({ children }) {
  const [mode, setMode] = useState('home')
  const [resume, setResume] = useState(() => {
    try {
      const storageKey = 'resumeforge-resume'
      const migrationKey = 'resumeforge-starter-content-cleaned-v1'
      let stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      if (localStorage.getItem(migrationKey) !== 'true') {
        stored = removeStarterContent(stored)
        localStorage.setItem(storageKey, JSON.stringify(stored))
        localStorage.setItem(migrationKey, 'true')
      }
      return {
        ...initialResume,
        ...stored,
        personal: { ...initialResume.personal, ...stored.personal },
        customization: { ...initialResume.customization, ...stored.customization },
        sectionOrder: pinPersonalFirst(stored.sectionOrder || defaultSectionOrder),
        customSections: stored.customSections || [],
      }
    } catch {
      return {
        ...initialResume,
        sectionOrder: defaultSectionOrder,
        customSections: [],
      }
    }
  })
  const [active, setActive] = useState('PERSONAL')
  const [saved, setSaved] = useState(true)
  const [tab, setTab] = useState('edit')
  const [toast, setToast] = useState('')
  const [showAddSection, setShowAddSection] = useState(false)

  useEffect(() => {
    if (mode !== 'builder') return undefined
    const timeout = setTimeout(() => {
      localStorage.setItem('resumeforge-resume', JSON.stringify(resume))
      setSaved(true)
    }, 450)
    return () => clearTimeout(timeout)
  }, [resume, mode])

  const update = (key, value) => {
    setSaved(false)
    setResume((previous) => ({ ...previous, [key]: value }))
  }

  const allSections = [
    ...sectionDefinitions.filter((section) => section.id !== 'CUSTOM'),
    ...resume.customSections.map((section) => ({
      id: section.id,
      label: section.title || 'Custom section',
      kind: 'customItem',
      customId: section.id,
    })),
    ...(resume.sectionOrder.includes('CUSTOM')
      ? [sectionDefinitions.find((section) => section.id === 'CUSTOM')]
      : []),
  ]
  const orderedSections = resume.sectionOrder
    .map((id) => allSections.find((section) => section.id === id))
    .filter(Boolean)

  const moveSection = (id, direction) => {
    if (id === 'PERSONAL') return
    const order = pinPersonalFirst(resume.sectionOrder).slice(1)
    const index = order.indexOf(id)
    const target = index + direction
    if (target < 0 || target >= order.length) return
    const section = order[index]
    order[index] = order[target]
    order[target] = section
    update('sectionOrder', ['PERSONAL', ...order])
  }

  const removeSection = (id) => {
    if (id === 'PERSONAL') return
    const index = resume.sectionOrder.indexOf(id)
    const order = resume.sectionOrder.filter((sectionId) => sectionId !== id)
    update('sectionOrder', order)
    if (active === id) {
      setActive(order[Math.max(0, index - 1)] || 'PERSONAL')
    }
    const section = allSections.find((item) => item.id === id)
    notify(`${section?.label || 'Resume'} section removed`)
  }

  const addSection = (id) => {
    if (id === 'CUSTOM') {
      const custom = {
        id: `CUSTOM_${resume.customSections.length + 1}`,
        title: '',
        items: [],
      }
      update('customSections', [...resume.customSections, custom])
      update('sectionOrder', [...resume.sectionOrder, custom.id])
      setActive(custom.id)
    } else {
      const section = sectionDefinitions.find((item) => item.id === id)
      const customSection = resume.customSections.find((item) => item.id === id)
      if (customSection && !resume.sectionOrder.includes(id)) {
        update('sectionOrder', [...resume.sectionOrder, id])
        setActive(id)
      } else if (section && !resume.sectionOrder.includes(id)) {
        update('sectionOrder', [...resume.sectionOrder, id])
        if (section.dataKey && !resume[section.dataKey]) update(section.dataKey, [])
        setActive(id)
      }
    }
    setShowAddSection(false)
  }

  const notify = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 2600)
  }
  const start = () => {
    setMode('builder')
    setActive('PERSONAL')
    window.scrollTo(0, 0)
  }
  const print = () => {
    window.print()
    notify('Your resume is ready to save as a PDF')
  }

  const value = {
    mode, setMode, resume, setResume, active, setActive, saved, tab, setTab,
    toast, showAddSection, setShowAddSection, update,
    allSections, orderedSections, moveSection, removeSection, addSection, notify, start, print,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}
