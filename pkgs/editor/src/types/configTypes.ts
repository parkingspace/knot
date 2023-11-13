import { JSXElement } from "solid-js";

export interface FeatureTypes {
  "caret": () => JSXElement;
  "whichkey": () => JSXElement;
  "typewriter": () => JSXElement;
  "sidebar": () => JSXElement;
  "search": () => JSXElement;
  "header": () => JSXElement;
}

export type FeatureName = keyof FeatureTypes;

export interface FeatureConfig {
  enabled: boolean;
}

export type Features = {
  [FeatureName in keyof FeatureTypes]: FeatureConfig;
};
