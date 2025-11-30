import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import { AudioPlayer } from "./src/components/AudioPlayer";
import FacebookComments from "./src/components/FacebookComments";

const docsComponents = getDocsMDXComponents();

export const useMDXComponents = (components) => ({
  ...docsComponents,
  ...components,
  AudioPlayer,
  FacebookComments,
});
