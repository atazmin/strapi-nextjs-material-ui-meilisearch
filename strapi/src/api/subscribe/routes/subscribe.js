"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/subscribe",
      handler: "subscribe.send",
      config: {
        auth: false,
      },
    },
  ],
};
