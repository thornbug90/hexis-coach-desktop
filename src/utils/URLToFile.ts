export const URLtoFile = async (url: string) => {
  // Gets URL data and read to blob
  const res = await fetch(url);
  const blob = await res.blob();

  // Gets blob MIME type (e.g. image/png) and extracts extension
  const mime = blob.type;
  const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);

  // Creates new File object using blob data, extension and MIME type
  const file = new File([blob], `filename.${ext}`, {
    type: mime,
  });

  return file;
};
