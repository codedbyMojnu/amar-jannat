import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { AudioPlayer } from './src/components/AudioPlayer'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  ...components,
  AudioPlayer
})
