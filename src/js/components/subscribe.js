import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const subscribe = () => {
  axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  function showToast(type, message) {
    iziToast.show({
      title: type === 'success' ? 'Success' : 'Error',
      message,
      position: 'topRight',
      color: type === 'success' ? 'green' : 'red',
      timeout: 4000,
      pauseOnHover: true,
      closeOnClick: true,
    });
  }

  async function createSubscription(email) {
    try {
      const { data } = await axios.post('/subscription', { email });
      showToast('success', data.message || 'Subscription created!');
    } catch (error) {
      if (error.response?.status === 409) {
        showToast('error', 'You are already subscribed!');
      } else {
        const msg =
          error.response?.data?.message ||
          error.message ||
          'Something went wrong!';
        showToast('error', msg);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.footer-subscribe-form');
    const input = form.querySelector('.footer-subscribe-input');

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const emailTrim = input.value.trim();

      if (!emailPattern.test(emailTrim)) {
        showToast(
          'error',
          'Please enter a valid email address. Example - info@goit.ua'
        );
        return;
      }

      await createSubscription(emailTrim);

      input.value = '';
    });
  });
};

export default subscribe;
