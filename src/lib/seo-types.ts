/**
 * Type definitions for generated SEO data
 */

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  h1: string;
  introduction: string;
  features: string[];
  benefits: string[];
  useCases: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageSEOData {
  pageId: string;
  language: string;
  minify: boolean;
  content: SEOContent;
  faqs: FAQItem[];
  variant?: string;
}

export interface CompleteSEOData {
  generatedAt: string;
  version: string;
  pages: PageSEOData[];
}
