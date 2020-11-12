import axios from 'axios';

export async function axiosRoute(method, url, data) {
  let options = null;
  if (data) {
    options = {
      method: method,
      url: url,
      data: data
    }
  } else {
    options = {
      method: method,
      url: url
    }
  }
  const resp = await axios(options).catch(async (error) => {
    console.log(error);
  })
  return resp
}