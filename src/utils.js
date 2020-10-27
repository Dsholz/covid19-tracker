export const formatHistorialData = (rawData) => {
  const extractedDates = Object.keys(rawData?.cases);

  let formattedData = [];

  extractedDates.forEach((date) => {
    const casesForDate = rawData?.cases?.[date];
    const recoverdForDate = rawData?.recovered?.[date];
    const deathsForDate = rawData?.deaths?.[date];

    formattedData.push({
      date,
      cases: casesForDate,
      deaths: deathsForDate,
      recovered: recoverdForDate,
    });
  });

  return formattedData;
};

export const formatHistorialCountryData = (rawData) => {
  const extractedDates = Object.keys(rawData?.timeline?.cases);

  let formattedData = [];

  extractedDates.forEach((date) => {
    const casesForDate = rawData?.timeline?.cases?.[date];
    const recoverdForDate = rawData?.timeline?.recovered?.[date];
    const deathsForDate = rawData?.timeline?.deaths?.[date];

    formattedData.push({
      date,
      cases: casesForDate,
      deaths: deathsForDate,
      recovered: recoverdForDate,
    });
  });

  return formattedData;
};

export const formatNewYorkTimesArticles = (data) => {
  const getFetchedArticles = data?.response?.docs;
  const formattedArticles = getFetchedArticles?.map((article) => {
    const getImageuRL = article.multimedia.find(
      (item) => item.type === "image"
    );
    return {
      title: article?.headline?.main,
      author: article?.byline?.original,
      publishedAt: article?.pub_date,
      url: article?.web_url,
      urlToImage: `https://static01.nyt.com/${getImageuRL.url}`,
    };
  });

  return formattedArticles;
};
