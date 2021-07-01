import React, { useEffect, useContext } from "react";
import { Context } from "../../Store";
import "./styles.css";

export default (props) => {
  const [state, dispatch] = useContext(Context);

  const pageNumber = props.match.params.page;
  const index = props.match.params.index;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  try {
    const article = state.pages[pageNumber][index];
    if (!article) {
      return <h1>Hello</h1>;
    }

    return (
      <div>
        <div className="news_container">
        <h1 className="logo">News Curator
          <span className="banner-icon__home material-icons">
            article
          </span>
        </h1>
          <div className="banner__home" style={{ background: `linear-gradient(to bottom, rgba(40, 40, 40, 0.65), #333), url('${article.image}')` }}>
            <h1 className="banner-heading__home">{article.title}</h1>
            <span className="result-metadata__results">
              <span className="result-date__results">
                <span className="material-icons">source</span>
                <span style={{ marginLeft: "2px" }}>{article.source}</span>
              </span>
              <span className="result-date__results">
                <span className="material-icons">signal_cellular_alt</span>
                <span style={{ marginLeft: "2px" }}>{article.sentiment}</span>
              </span>
              <span className="result-date__results">
                <span className="material-icons">fact_check</span>
                <span style={{ marginLeft: "2px" }}>
                  {100 - Math.round(article.subjectivity * 100)}%
              </span>
              </span>
              <span className="result-date__results">
                <span className="material-icons">event</span>
                <span style={{ marginLeft: "2px" }}>{article.date}</span>
              </span>
              <span className={`result-date__results ${article.fake === "0" ? "fake" : "genuine"}`}>
              <span className="material-icons">{article.fake === "0" ? "gpp_maybe" : "gpp_good"}</span>
              <span style={{ marginLeft: "2px" }}>
                {article.fake === "0" ? "Potentially Fake" : "Verified News"}
              </span>
            </span>
            </span>
          </div>
          <p className="news_content">
            {article.content}
            <h4>
              <a className="link" target="_blank" href={article.link}>
                Link to original source
            </a>
            </h4>
          </p>
        </div>
      </div>
    );
  } catch {
    return <h1>Hello</h1>;
  }
};
