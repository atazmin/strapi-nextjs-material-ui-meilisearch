export default async function handler(req, res) {
  // console.log("pages - api - revalidate.js - req: ", req.body);

  const model = req.body.model ?? "";
  const slug = req.body.entry?.slug ?? "";
  let pathToRevalidate = "";

  switch (model) {
    case "artist":
      pathToRevalidate = `/artists/${slug}`;
      break;
    case "artwork":
      pathToRevalidate = `/artworks/${slug}`;
      break;
    case "client":
      pathToRevalidate = `/clients/${slug}`;
      break;
    case "event":
      pathToRevalidate = `/events/${slug}`;
      break;
    case "installation":
      pathToRevalidate = `/installations/${slug}`;
      break;
    case "page":
      pathToRevalidate = `/${slug}`;
      break;
    case "video":
      pathToRevalidate = `/videos/${slug}`;
      break;
    case "homepage":
      pathToRevalidate = `/`;
      break;
    case "artist-page":
      pathToRevalidate = `/artists`;
      break;
    case "artwork-page":
      pathToRevalidate = `/artworks`;
      break;
    case "search-page":
      pathToRevalidate = `/search`;
      break;
    default:
      pathToRevalidate = `/`;
      break;
  }

  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(pathToRevalidate);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
