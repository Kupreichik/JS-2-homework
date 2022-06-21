export function serviceWithBody(url = '', method = 'POST', body = {}) {
  return fetch(
    url,
    {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body)
    }
  ).then((res) => res.json())
}