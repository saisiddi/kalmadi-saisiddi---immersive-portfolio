export interface Project {
  title: string;
  description: string;
  stack: string[];
  links: {
    demo: string;
    github: string;
  };
  image: string;
}

export interface SocialLink {
  label: string;
  url: string;
  email?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}