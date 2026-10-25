/* RaaSki — project data exports.
   Re-exports typed data from portfolioData.ts for modular component usage. */

import { defaultPortfolioData, type ProjectItem } from './portfolioData';

export type Project = ProjectItem;

export const projects: Project[] = defaultPortfolioData.projects;
