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
    const formatDate = formateUTCDate(article?.pub_date);
    const getImageuRL = article?.multimedia?.find(
      (item) => item.type === "image"
    );
    return {
      title: article?.headline?.main,
      author: article?.byline?.original,
      publishedAt: formatDate,
      url: article?.web_url,
      urlToImage: getImageuRL
        ? `https://static01.nyt.com/${getImageuRL.url}`
        : "",
    };
  });

  return formattedArticles;
};

const formateUTCDate = (date) => {
  const parsedDate = new Date(date);
  const month = getGivenMonth(parsedDate.getMonth());
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month} ${day}, ${year}`;
};

const getGivenMonth = (monthNo) => {
  switch (monthNo) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      break;
  }
};
