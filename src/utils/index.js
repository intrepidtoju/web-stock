import Axios from 'axios';
import moment from 'moment';
import config from './config';

export function formatUrl(url) {
  return config.BASE_URL + url.replace(/[ &#,+()$~%'"*<>{}]/g, '-').toLowerCase();
}

// Get index of object in an array
export function indexOf(array, objectKey, objectValue) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][objectKey] == objectValue) {
      return i;
    }
  }

  return void 0;
}

export function numberFormat(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export async function getContent({ url, method = 'GET', baseUrl = config.BASE_URL }) {
  try {
    const token = session.get('token'),
      headers = { 'X-Requested-With': 'XMLHttpRequest' };
    if (token) headers.Authorization = `bearer ${token}`;

    const result = await Axios({
      method,
      url: baseUrl + url,
      headers,
    });

    return result.data; //Kindly login to continue
  } catch (err) {
    if (err.response.data.message === 'Kindly login to continue') {
      window.location.href = '/login';
    }
    throw err.response.data;
  }
}

export async function postContent({ url, data, method = 'POST', baseUrl = config.BASE_URL }) {
  try {
    const token = session.get('token'),
      headers = { 'X-Requested-With': 'XMLHttpRequest' };
    if (token) headers.Authorization = `bearer ${token}`;

    const result = await Axios({
      method,
      url: baseUrl + url,
      data,
      headers,
    });

    return result.data;
  } catch (err) {
    console.log('Error', err.response.data);
    if (err.response.data.message === 'Kindly login to continue') {
      window.location.href = '/admin-login';
    }
    throw err.response.data;
  }
}

export function errorMessage(err) {
  if (config.ENV === 'dev') console.log(err.response);
  return err.response.data.message;
}

export function formatEventDate(date) {
  date = moment(date).format();
  date = date.split('+').shift();
  return date;
}

export const session = {
  set: (key, value) => {
    if (!key || !value) {
      return;
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },

  get: (key) => {
    var value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    // assume it is an object that has been stringified
    if (value[0] === '{') {
      value = JSON.parse(value);
    }

    return value;
  },

  remove: (key) => {
    localStorage.removeItem(key);
    return true;
  },
};

export function queryString(params) {
  const data = Object.entries(params)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');

  return data;
}

export function convertToFormData(values) {
  const data = new FormData();
  for (let key in values) {
    data.append(key, values[key]);
  }

  return data;
}

export function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 11) {
    throw new Error('Phone number must be equal to 11 digits');
  }
  if (!phoneNumber.startsWith('0')) {
    throw new Error('Phone number must start with zero');
  }
  return `+234-${phoneNumber.substr(1)}`;
}

export function convertPhoneNumber(phoneNumber) {
  let changedPhoneNumber = phoneNumber.split('+234');
  return `0${changedPhoneNumber[1]}`;
}
