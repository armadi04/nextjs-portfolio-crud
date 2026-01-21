export interface Skill {
  name: string;
  icon: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export interface Project {
  title: string;
  month: string;
  year: string;
  link: string;
  description: string;
  image?: string;
  tags?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  image: string;
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  about: string;
  skills: {
    frontend: Skill[];
    backend: Skill[];
    others: Skill[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  achievements: Achievement[];
  contact: ContactInfo;
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
  };
}
