import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const header = (await import(`../dictionaries/${locale}/header.json`))
    .default;

  return {
    locale,
    messages: {
      header,
    },
  };
});
