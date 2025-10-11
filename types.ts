
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export interface Tool {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  link: string;
}

export interface SubCategory {
  name: string;
  tools: Tool[];
}

export interface Category {
  name: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  subCategories: SubCategory[];
}
