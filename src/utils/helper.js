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

export function nameFilter(array, characters) {
  const resp = array.filter(student => student.firstName.toLowerCase().includes(characters.toLowerCase()) || student.lastName.toLowerCase().includes(characters.toLowerCase()))
  return resp
}

export function tagFilter(array, characters) {
  let noTags = array.filter(student => student.tags.length)
  let resp = noTags.filter(student => {
    const studentMatch = student.tags.filter(tag => tag.toLowerCase().includes(characters.toLowerCase()))
    if (studentMatch.length) {
      return true
    } else {
      return false
    }
  })
  return resp
}