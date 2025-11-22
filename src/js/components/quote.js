import { api } from '../api/api.js';

const quote = () => {
  const QUOTE_PLACEHOLDER = `A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.`;
  const AUTHOR_PLACEHOLDER = 'Tom Brady';

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const { quote, author } = await api.getQuote();

      document.getElementById('quote-text').textContent = quote;
      document.getElementById('quote-author').textContent = author;
    } catch (err) {
      console.error('Error loading quote:', err);

      document.getElementById('quote-text').textContent = QUOTE_PLACEHOLDER;
      document.getElementById('quote-author').textContent = AUTHOR_PLACEHOLDER;
    }
  });
};

export default quote;
