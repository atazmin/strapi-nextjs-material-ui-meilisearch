export async function fetcher(url, options = {}) {
  try {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export async function fetcherWithPagination(url, options = {}) {
  try {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    const { data, meta } = await response.json();
    return { data, meta };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
