import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Store";
import { useHistory } from "react-router-dom";
import "./styles.css";
import ReactWordCloud from 'react-wordcloud';


const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [query, setQuery] = useState(state.query);
  const [topSearches, setTopSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [wordCloud, setWordCloud] = useState(undefined);

  const history = useHistory();
  const callbacksForWordCloud = {
    onWordMouseOver: (_, event) => {
      event.target.style.fill = "#ffffff";
    },
    onWordMouseOut: (_, event) => {
      event.target.style.fill = "#aaaaaa";
    },
    onWordClick: (word, event) => {
      setQuery(word.text);
    }
  };

  const handleClick = () => {
    if (query != state.query) {
      setShowResults(true);
      dispatch({ type: "STASH_PAGES" });
      dispatch({ type: "SET_QUERY", payload: query });
    } else {
      history.push("/results/0");
    }
  }

  useEffect(() => {
    if (showResults) {
      setShowResults(false);
      history.push("/results/0");
    }
  }, [state.query]);

  useEffect(() => {
    setWordCloud(
      <ReactWordCloud
        words={topSearches}
        options={{
          rotations: 2,
          rotationAngles: [0],
          colors: ['#aaaaaa'],
          fontFamily: 'Lato',
          enableTooltip: false,
        }}
        callbacks={callbacksForWordCloud}
      />
    );
  }, [topSearches]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${state.base}/api/top`)
      if (response.ok) {
        const words = JSON.parse(await response.json()).india.map((word, index) => {
          return {
            text: word,
            value: 25 - index,
          };
        })
        console.log(words);
        setTopSearches(words);
      }
    })();
  }, [])

  return (
    <div className="home">
      <div className="banner__home">
        <div className="banner-heading__home">
          <h1>News Curator
          <span className="banner-icon__home material-icons">
              article
          </span>
          </h1>
          {/* <div style={{textAlign: 'center'}}>Get news with brain!</div> */}
        </div>
        <div className="search__home">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
          <button onClick={handleClick}>
            <span className="material-icons">
              search
              </span>
          </button>
        </div>
        <div>
          <>
            {wordCloud}
          </>
        </div>
      </div>
    </div>
  );
};

export default Home;
