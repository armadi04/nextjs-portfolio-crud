import { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Your Name",
  tagline: "Full Stack Developer",
  bio: "Fast Learner | Team Work | Hard Worker",
  about:
    "I'm a passionate Full Stack Developer who loves learning various frameworks and technologies. I am currently focused on Next.js and modern web development. I am enthusiastic about building elegant and high-performance web applications.\n\nMy journey in the programming world began with a curiosity about how digital experiences are built and a willingness to learn new things to create capable web designs. Outside of coding, I love to continuously learn and share my knowledge to inspire others to achieve their goals.",

  stats: {
    yearsExperience: "1+",
    projectsCompleted: "7",
  },

  skills: {
    frontend: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "ReactJS", icon: "react" },
      { name: "Redux", icon: "redux" },
      { name: "NextJS", icon: "nextjs" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "Shadcn UI", icon: "shadcn" },
      { name: "React Icons", icon: "reacticons" },
      { name: "Huge Icons", icon: "hugeicons" },
    ],
    backend: [
      { name: "Node JS", icon: "nodejs" },
      { name: "Laravel", icon: "laravel" },
      { name: "Express JS", icon: "express" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
      { name: "PhpMyAdmin", icon: "phpmyadmin" },
    ],
    others: [
      { name: "Git", icon: "git" },
      { name: "Github", icon: "github" },
      { name: "Canva", icon: "canva" },
      { name: "CapCut", icon: "capcut" },
      { name: "Mikrotik", icon: "mikrotik" },
      { name: "Cisco Packet Tracer", icon: "cisco" },
      { name: "Docker", icon: "docker" },
    ],
  },

  experience: [
    {
      title: "Full Stack Developer",
      company: "Freelancer",
      period: "2025 - Present",
      description: [
        "Implementing reusable components.",
        "Participating in large scale application.",
        "Working on the performance of web applications.",
        "Generating new ideas for better user experience.",
      ],
    },
    {
      title: "Framework Study",
      company: "Learn to be Independent",
      period: "2025 - Present",
      description: [
        "Always learn in studying various frameworks.",
        "Increase insight and knowledge about the world of programming.",
        "Provide support for yourself so you don't give up easily.",
      ],
    },
    {
      title: "Marketing",
      company: "TopLoker.com",
      period: "2024 - Present",
      description: [
        "Teaching good and correct offers.",
        "Participating in internal meetings.",
        "Assisting marketers in learning offer techniques to potential customers.",
      ],
    },
  ],

  projects: [
    {
      title: "TopLoker Sosmed",
      month: "June",
      year: "2024",
      link: "https://toploker-linktree.vercel.app/",
      description:
        "Social media aggregator platform for TopLoker showing Instagram accounts across Indonesian provinces.",
      image: "/projects/toploker-sosmed.png",
      tags: [
        "Next.js",
        "TailwindCSS",
        "React",
        "React Router",
        "Framer Motion",
        "TypeScript",
      ],
    },
    {
      title: "Website Portfolio #1",
      month: "June",
      year: "2025",
      link: "https://armadii.vercel.app/",
      description:
        "Personal portfolio website featuring a unique hexagonal profile design and dark theme aesthetic.",
      image: "/projects/portfolio-1.png",
      tags: ["React", "TailwindCSS", "Framer Motion", "TypeScript"],
    },
    {
      title: "Website Portfolio #2",
      month: "September",
      year: "2025",
      link: "https://armadii19.vercel.app/",
      description:
        "Professional dark-themed portfolio website with advanced animations and clean layout.",
      image: "/projects/portfolio-2.png",
      tags: ["React", "Next JS", "TailwindCSS", "Framer Motion", "TypeScript"],
    },
    {
      title: "Web Premium Store",
      month: "December",
      year: "2025",
      link: "https://medskymovie.vercel.app/",
      description:
        "Medsky Movie - An e-commerce platform for purchasing premium streaming service subscriptions.",
      image: "/projects/web-premium-store.png",
      tags: [
        "Next.js",
        "React",
        "TailwindCSS",
        "TypeScript",
        "Lucide",
        "Framer Motion",
        "Shadcn UI",
        "Radix UI",
      ],
    },
    {
      title: "LinkUp",
      month: "December",
      year: "2025",
      link: "https://linkup-id.vercel.app/",
      description: "LinkUp - A link shortener platform for sharing links.",
      image: "/projects/linkup-id.png",
      tags: [
        "Next.js",
        "React",
        "TailwindCSS",
        "TypeScript",
        "Lucide",
        "Framer Motion",
        "Shadcn UI",
        "Radix UI",
      ],
    },
    {
      title: "Website Portfolio #3",
      month: "January",
      year: "2026",
      link: "#",
      description:
        "Minimalist light-themed portfolio focusing on typography and clear content structure.",
      image: "/projects/portfolio-3.png",
      tags: [
        "Next.js",
        "React",
        "TailwindCSS",
        "TypeScript",
        "Lucide",
        "Framer Motion",
        "Shadcn UI",
        "Radix UI",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Informatics Engineering",
      institution: "STEKOM University",
      period: "June 2024 - Present",
      description:
        "I'm an undergraduate at STEKOM University pursuing a Bachelor's Degree in Computer Engineering with a full scholarship.",
    },
    {
      degree: "Computer & Network Engineering",
      institution: "SMKN 1 Leuwimunding",
      period: "June 2021 - April 2024",
      description:
        "I'm a full-time student in the TKJ program, which stands for Teknik Komputer dan Jaringan (Computer and Network Engineering). This is where I started to learn about networking and many other things.",
    },
  ],

  achievements: [
    {
      title: "CODE FEST'25 HACKATHON",
      description:
        "I'm and the Team from STEKOM University have participated in this International Event which is participated by several countries in the world. Program creation and problem solving in this event must be completed within 24 hours.",
      image: "/achievements/1-Hackathon.png",
    },
    {
      title: "Field Work Practice",
      description:
        "I followed a mandatory program, namely Field Work Practice from SMKN 1 Leuwimunding. My three friends and I ran this program for 3 months at MTSn 1 Cirebon. I played an important role in increasing network traffic in the school's TKJ Laboratory Room.",
      image: "/achievements/2-pkl.png",
    },
    {
      title: "WEBINAR IT NETWORKING",
      description:
        "I attended the IT Networking Webinar Event organized by ID Networkers on April 21, 2025",
      image: "/achievements/3-WebinarIT.webp",
    },
    {
      title: "UJIKOM KEAHLIAN TKJ 2024",
      description:
        "I'm the student who successfully achieved the highest score and became the student with the fastest completion time for the SMKN 1 Leuwimunding TKJ Skills Competency Test in 2024.",
      image: "/achievements/7-ujikom.jpg",
    },
    {
      title: "Cloud Openstack",
      description:
        "Explored and deployed cloud infrastructure using OpenStack, understanding the core components of cloud computing.",
      image: "/achievements/4-cloudOpenstack.png",
    },
    {
      title: "Virtualization Technology",
      description:
        "Implemented virtualization solutions to optimize resource usage and improve system management.",
      image: "/achievements/5-Virtualization.png",
    },
    {
      title: "Mikrotik ROS7 Configuration",
      description:
        "Configured and managed Mikrotik routers using RouterOS v7 for efficient network routing and management.",
      image: "/achievements/6-mikrotikROS7.png",
    },
  ],

  contact: {
    email: "your-email@example.com",
    whatsapp: "+62 xxx-xxxx-xxxx",
    location: "Your City, Country",
  },
};
