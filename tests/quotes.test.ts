import { describe, expect, it } from 'vitest';
import { quotes, selectQuoteIndex } from '../src/config/quotes';

describe('homepage quotes', () => {
  it('contains sixteen attributed quotes split evenly between Chinese and English', () => {
    expect(quotes).toHaveLength(16);
    expect(quotes.filter((quote) => quote.lang === 'zh')).toHaveLength(8);
    expect(quotes.filter((quote) => quote.lang === 'en')).toHaveLength(8);
    expect(quotes.every((quote) => quote.text && quote.author && quote.source)).toBe(true);
  });

  it('selects a deterministic quote and avoids an immediate repeat', () => {
    expect(selectQuoteIndex(4, null, () => 0.5)).toBe(2);
    expect(selectQuoteIndex(4, 2, () => 0.5)).toBe(3);
  });

  it('handles empty and single-item quote collections', () => {
    expect(selectQuoteIndex(0, null, () => 0.2)).toBe(-1);
    expect(selectQuoteIndex(1, 0, () => 0.9)).toBe(0);
  });
});
