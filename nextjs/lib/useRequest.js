import useSWR from "swr";
const qs = require("qs");

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = process.env.NEXT_PUBLIC_STRAPI_API;

export const useGetSitewide = () => {
  const url = `${API}/sitewide?publicationState=live&populate[siteLogo][populate]=%2A&populate[footer][populate]=%2A&populate[shared][populate]=%2A`;
  const { data: { data: { attributes: data } = {} } = {}, error } = useSWR(
    url,
    fetcher
  );
  return { data, error };
};

export const useGetNavigation = () => {
  const url = `${API}/navigation?publicationState=live&populate[0]=links`;
  const { data: { data: { attributes: { links } = {} } = {} } = {}, error } =
    useSWR(url, fetcher);
  return { links, error };
};

export const useGetRandomArtworks = () => {
  const url = `${API}/artwork/random`;
  const { data: { data: artworks } = {}, error } = useSWR(url, fetcher);
  return { artworks, error };
};

export const useGetFeaturedEvents = () => {
  const eventsQuery = qs.stringify(
    {
      populate: ["featuredImage"],
      filters: {
        isShowOnHomepage: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${API}/events?publicationState=live&${eventsQuery}&sort=date%3Aasc&pagination[page]=1&pagination[pageSize]=2`;
  const { data: { data: featuredEvents } = {}, error } = useSWR(url, fetcher);
  return { featuredEvents, error };
};

export const useGetFeaturedInstallation = () => {
  const installationQuery = qs.stringify(
    {
      populate: ["featuredImage"],
      filters: {
        isShowOnHomepage: true,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const url = `${API}/installations?publicationState=live&${installationQuery}&sort=publishedAt%3Aasc&pagination[page]=1&pagination[pageSize]=1`;
  const { data: { data: featuredInstallation } = {}, error } = useSWR(
    url,
    fetcher
  );
  return { featuredInstallation, error };
};