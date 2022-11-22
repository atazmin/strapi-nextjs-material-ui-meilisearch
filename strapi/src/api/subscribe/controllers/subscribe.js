"use strict";

const Mailchimp = require("mailchimp-api-v3");
var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

module.exports = {
  async send(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      ctx.status = 400;
      ctx.body = "Email is required";
      return;
    }

    try {
      const response = await mailchimp.request({
        method: "post",
        path: `/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        body: {
          email_address: email,
          status: "subscribed",
        },
      });
      strapi.log.debug(`Sending data from ${email} ...`);
      ctx.send({
        success: `${email}, thank you for your subscription!`,
      });
    } catch (error) {
      strapi.log.error(`Error sending data from ${email}`, error);
      ctx.send({
        error: `Please try again: ${error.detail}`,
      });
    }
  },
};
