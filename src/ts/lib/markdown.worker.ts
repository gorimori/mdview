// @ts-ignore
import marked from 'marked';

export const md2html = async (md: string): Promise<string> => {
  return marked(md) as string;
};
