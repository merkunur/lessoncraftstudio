export type { ToolContent } from './types';

export async function getToolContent(toolId: string, locale: string) {
  try {
    const mod = await import(`./${locale}/${toolId}`);
    return (mod.default ?? null) as import('./types').ToolContent | null;
  } catch {
    return null;
  }
}
