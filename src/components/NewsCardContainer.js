import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCovid19News } from "../Api";
import { formatNewYorkTimesArticles } from "../utils";
import NewsCard from "./NewsCard";

function NewsCardContainer() {
  const [covid19News, setCovid19News] = useState([]);
  const [articlePageCount, setArticlePageCount] = useState(0);
  const [fetchingMoreArticles, setFetchingMoreArticles] = useState(false);

  useEffect(() => {
    setFetchingMoreArticles(true);
    getCovid19News(0).then((data) => {
      const formattedArticles = formatNewYorkTimesArticles(data);

      setCovid19News(formattedArticles);
      setFetchingMoreArticles(false);
    });
  }, []);

  const loadMoreArticles = () => {
    setFetchingMoreArticles(true);
    const presentPostLength = covid19News.length;

    getCovid19News(articlePageCount + 1).then((data) => {
      const moreArticles = formatNewYorkTimesArticles(data);

      if (presentPostLength < 50) {
        setCovid19News([...covid19News, ...moreArticles]);
        setArticlePageCount(articlePageCount + 1);
      }

      setFetchingMoreArticles(false);
    });
  };

  return (
    <Fragment>
      <div id="News" className="news-card-container">
        {covid19News.map((article) => (
          <NewsCard key={article.title} articleData={article} />
        ))}
      </div>
      {covid19News.length !== 50 && (
        <button
          className="news-card-container__load-more"
          onClick={loadMoreArticles}
          disabled={fetchingMoreArticles}
        >
          {fetchingMoreArticles ? "Loading..." : "Load More"}
        </button>
      )}
    </Fragment>
  );
}

export default NewsCardContainer;
