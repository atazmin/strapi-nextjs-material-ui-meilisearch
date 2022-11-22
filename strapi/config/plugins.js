module.exports = ({ env }) => ({
  meilisearch: {
    config: {
      // Your meili host
      host: env("MEILISEARCH_HOST"),
      // // Your master key or private key
      apiKey: env("MEILISEARCH_MASTER_KEY"),
      artwork: {
        transformEntry({ entry }) {
          return {
            id: entry.id,
            attributes: {
              ...entry,
              image: {
                data: {
                  id: entry.image.id,
                  attributes: {
                    ...entry.image,
                  },
                },
              },
            },
          };
        },
      },
      // artwork: {
      //   indexName: "all",
      // },
      // artist: {
      //   indexName: "all",
      // },
      // page: {
      //   indexName: "all",
      // },
      // post: {
      //   indexName: "all",
      // },
      // video: {
      //   indexName: "all",
      // },
      // installation: {
      //   indexName: "all",
      // },
      // event: {
      //   indexName: "all",
      // },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        page: {
          field: "slug",
          references: "name",
        },
        post: {
          field: "slug",
          references: "name",
        },
        category: {
          field: "slug",
          references: "name",
        },
        artist: {
          field: "slug",
          references: "name",
        },
      },
    },
    publisher: {
      enabled: true,
    },
  },
  graphql: {
    enabled: false,
    config: {
      defaultLimit: 100,
      maxLimit: 250,
    },
  },
});
