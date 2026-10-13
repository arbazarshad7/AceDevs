/**
 * Calculates word count and estimated reading time for technical prose and code snippets.
 * @param {string} text - Raw markdown or text content
 * @param {number} wpm - Words per minute (default: 200 for technical content)
 * @returns {{ wordsCount: number, readingTimeMinutes: number, readTimeText: string }}
 */
export function calculateReadingTime(text, wpm = 200) {
  if (!text || typeof text !== 'string') {
    return { wordsCount: 0, readingTimeMinutes: 1, readTimeText: '1 MIN READ' };
  }

  // Remove code blocks and markdown syntax for word count
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // remove fenced code
    .replace(/`.*?`/g, '')          // remove inline code
    .replace(/[#*_\-[\]()>`]/g, ' ') // remove markdown symbols
    .trim();

  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordsCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordsCount / wpm));

  return {
    wordsCount,
    readingTimeMinutes,
    readTimeText: `${readingTimeMinutes} MIN READ`
  };
}

export default calculateReadingTime;
