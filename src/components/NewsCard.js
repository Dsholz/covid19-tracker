import React from "react";

function NewsCard(props) {
  const { title, author, publishedAt, url, urlToImage } = props.articleData;

  return (
    <a className="news-card" href={url} target="blank">
      <div className="news-card__left">
        <h1 className="news-card__title">{title}</h1>
        <span className="news-card__author">{author}.</span>
        <span className="news-card__date">{publishedAt}</span>
      </div>

      <div className="news-card__right">
        <img className="news-card__img" src={urlToImage} alt="Article Pic" />
      </div>
    </a>
  );
}

export default NewsCard;
