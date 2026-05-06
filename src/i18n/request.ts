import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    locale = "en";
  }

  const header = (await import(`../dictionaries/${locale}/header.json`))
    .default;

  return {
    locale,
    messages: {
      header,
    },
  };
});
