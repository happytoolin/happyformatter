export interface LanguageInfo {
  [key: string]: Info;
}

export interface Info {
  title: string;
  description: string;
  features: string[];
  additional_info: string[];
  tools: string[];
  validator: Validator;
}

export interface Validator {
  title: string;
  description: string;
  features: string[];
}
