import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCovid19News } from "../Api";
import NewsCard from "./NewsCard";

function NewsCardContainer() {
  const [covid19News, setCovid19News] = useState([]);
  const [totalCovid19News, setTotalCovidNews] = useState([]);
  const areArticlesExhausted = covid19News.length === totalCovid19News.length;

  useEffect(() => {
    getCovid19News().then((data) => {
      setCovid19News(data?.articles.slice(0, 10));
      setTotalCovidNews(data?.articles);
    });
  }, []);

  const loadMoreArticles = () => {
    const availablePosts = 50;
    const presentPostLength = covid19News.length;
    const morePosts = totalCovid19News.slice(
      presentPostLength,
      presentPostLength + 10
    );

    if (presentPostLength < availablePosts) {
      setCovid19News([...covid19News, ...morePosts]);
    }
  };

  return (
    <Fragment>
      <div id="News" className="news-card-container">
        {covid19News.map((article) => (
          <NewsCard key={article.title} articleData={article} />
        ))}
      </div>
      {!areArticlesExhausted && (
        <button
          className="news-card-container__load-more"
          onClick={loadMoreArticles}
        >
          Load More
        </button>
      )}
    </Fragment>
  );
}

export default NewsCardContainer;
