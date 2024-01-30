import fetch from 'node-fetch';

async function getJson(url) {
  const r = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  return r?.json?.() || {};
}

function run() {
  let limiter = 1000;
  let counter = 0;
  getJson(
    'https://www.letsrevolutionizetesting.com/challenge',
  ).then(async (r) => {
    let response = r;
    while (response.follow && limiter > 0) {
      limiter--;
      counter++;
      // console.log({ response });
      response = await getJson(response.follow);
    }
    console.log({ last: response, counter });
  });
}

run();