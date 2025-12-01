import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import { AudioPlayer } from "./src/components/AudioPlayer";
import FacebookComments from "./src/components/FacebookComments";
import InteractiveQuiz from "./src/components/InteractiveQuiz";

const docsComponents = getDocsMDXComponents();

export const useMDXComponents = (components) => ({
  ...docsComponents,
  ...components,
  AudioPlayer,
  FacebookComments,
  InteractiveQuiz,
});
