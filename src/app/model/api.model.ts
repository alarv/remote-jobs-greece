export type ContentOption = {
  checked: boolean;
  label: string;
  value: string;
};
export type CatalogValues = {
  name: string;
  options: ContentOption[];
  id: string;
};

export const jobFieldCatalog: CatalogValues = {
  id: 'job_field',
  name: 'Job Field',
  options: [
    {
      value: 'software',
      label: 'Software Development and IT',
      checked: false,
    },
    { value: 'marketing', label: 'Digital Marketing', checked: false },
    { value: 'design', label: 'Design and Creative', checked: false },
    {
      value: 'content',
      label: 'Writing and Content Creation',
      checked: false,
    },
    { value: 'customer_support', label: 'Customer Support', checked: false },
    {
      value: 'project_management',
      label: 'Project Management',
      checked: false,
    },
    {
      value: 'sales',
      label: 'Sales and Business Development',
      checked: false,
    },
    { value: 'hr', label: 'Human Resources', checked: false },
    {
      value: 'education',
      label: 'Education and Online Teaching',
      checked: false,
    },
    { value: 'financial', label: 'Financial and Accounting', checked: false },
    { value: 'healthcare', label: 'Healthcare', checked: false },
    { value: 'legal', label: 'Legal', checked: false },
    { value: 'research', label: 'Research and Analysis', checked: false },
    {
      value: 'translation',
      label: 'Translation and Localization',
      checked: false,
    },
    {
      value: 'virtual_assistance',
      label: 'Virtual Assistance',
      checked: false,
    },
    { value: 'consulting', label: 'Consulting and Coaching', checked: false },
    { value: 'engineering', label: 'Engineering', checked: false },
    { value: 'science', label: 'Science and Laboratory', checked: false },
    { value: 'architecture', label: 'Architecture', checked: false },
    { value: 'data_entry', label: 'Data Entry', checked: false },
  ],
};

export const employmentTypeCatalog: CatalogValues = {
  id: 'employment_type',
  name: 'Employment Type',
  options: [
    { value: 'full_time', label: 'Full-time', checked: false },
    { value: 'part_time', label: 'Part-time', checked: false },
    { value: 'contract', label: 'Contract', checked: false },
    { value: 'internship', label: 'Internship', checked: false },
    { value: 'temporary', label: 'Temporary', checked: false },
  ],
};

export const remoteWorkTypeCatalog: CatalogValues = {
  id: 'remote_work_type',
  name: 'Remote Work Type',
  options: [
    { value: 'remote', label: 'Remote', checked: false },
    { value: 'hybrid', label: 'Hybrid', checked: false },
  ],
};

export const experienceCatalog: CatalogValues = {
  id: 'experience',
  name: 'Experience Level',
  options: [
    { value: 'entry_level', label: 'Entry-Level', checked: false },
    { value: 'junior', label: 'Junior', checked: false },
    { value: 'mid_level', label: 'Mid-Level', checked: false },
    { value: 'senior', label: 'Senior', checked: false },
    { value: 'lead_principal', label: 'Lead/Principal', checked: false },
    { value: 'management', label: 'Management', checked: false },
    { value: 'executive', label: 'Executive', checked: false },
    { value: 'internship', label: 'Internship', checked: false },
  ],
};

export const DEFAULT_FILTERS_CONTENT: CatalogValues[] = [
  jobFieldCatalog,
  employmentTypeCatalog,
  experienceCatalog,
];
