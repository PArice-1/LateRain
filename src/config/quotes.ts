export interface Quote {
  text: string;
  lang: 'zh' | 'en';
  author: string;
  source: string;
}

export const quotes: Quote[] = [
  { text: '长风破浪会有时，直挂云帆济沧海。', lang: 'zh', author: '李白', source: '《行路难·其一》' },
  { text: '路漫漫其修远兮，吾将上下而求索。', lang: 'zh', author: '屈原', source: '《离骚》' },
  { text: '千磨万击还坚劲，任尔东西南北风。', lang: 'zh', author: '郑燮', source: '《竹石》' },
  { text: '纸上得来终觉浅，绝知此事要躬行。', lang: 'zh', author: '陆游', source: '《冬夜读书示子聿》' },
  { text: '山重水复疑无路，柳暗花明又一村。', lang: 'zh', author: '陆游', source: '《游山西村》' },
  { text: '不积跬步，无以至千里。', lang: 'zh', author: '荀子', source: '《劝学》' },
  { text: '老骥伏枥，志在千里。', lang: 'zh', author: '曹操', source: '《龟虽寿》' },
  { text: '会当凌绝顶，一览众山小。', lang: 'zh', author: '杜甫', source: '《望岳》' },
  { text: 'To strive, to seek, to find, and not to yield.', lang: 'en', author: 'Alfred Tennyson', source: 'Ulysses' },
  { text: 'I am the master of my fate, I am the captain of my soul.', lang: 'en', author: 'William Ernest Henley', source: 'Invictus' },
  { text: 'The readiness is all.', lang: 'en', author: 'William Shakespeare', source: 'Hamlet' },
  { text: 'Our doubts are traitors, and make us lose the good we oft might win.', lang: 'en', author: 'William Shakespeare', source: 'Measure for Measure' },
  { text: 'Nothing great was ever achieved without enthusiasm.', lang: 'en', author: 'Ralph Waldo Emerson', source: 'Circles' },
  { text: 'Hope is the thing with feathers.', lang: 'en', author: 'Emily Dickinson', source: 'Poem 254' },
  { text: 'Success is counted sweetest by those who ne’er succeed.', lang: 'en', author: 'Emily Dickinson', source: 'Poem 112' },
  { text: 'The future is no more uncertain than the present.', lang: 'en', author: 'Walt Whitman', source: 'Song of the Broad-Axe' },
];

export function selectQuoteIndex(
  length: number,
  previousIndex: number | null,
  random: () => number = Math.random,
): number {
  if (length <= 0) return -1;
  if (length === 1) return 0;

  const candidate = Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
  return candidate === previousIndex ? (candidate + 1) % length : candidate;
}
