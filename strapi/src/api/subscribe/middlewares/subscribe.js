module.exports = (config, { strapi }) => {
  return (context, next) => {
    console.log("middleware subscribe");
    return next();
  };
};
