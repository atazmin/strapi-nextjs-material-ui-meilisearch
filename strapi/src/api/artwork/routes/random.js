"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/artwork/random",
      handler: "artwork.random",
      config: {
        auth: false,
      },
    },
  ],
};
