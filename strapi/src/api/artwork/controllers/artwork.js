"use strict";

/**
 *  artwork controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::artwork.artwork", ({ strapi }) => {
  const numberOfEntries = 8;
  return {
    async random(ctx) {
      const entries = await strapi.entityService.findMany(
        "api::artwork.artwork",
        {
          populate: ["image", "pageHeading", "seo", "socialMedia", "artist"],
        }
      );

      const randomEntries = [...entries]
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfEntries);

      const structureRandomEntries = {
        data: randomEntries.map((entry) => {
          return {
            id: entry.id,
            attributes: {
              ...entry,
              image: {
                data: {
                  id: entry.image.id,
                  attributes: entry.image,
                },
              },
              artist: {
                data: {
                  id: entry.artist.id,
                  attributes: entry.artist,
                },
              },
            },
          };
        }),
      };

      ctx.body = structureRandomEntries;
    },
  };
});
