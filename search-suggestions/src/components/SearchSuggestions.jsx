import React, { useEffect, useRef, useState } from "react";
import Search from "./Search";
import Suggestions from "./Suggestions";

const SearchSuggestions = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cache, setCache] = useState({});
  const searchRef = useRef();

  const fetchData = async () => {
    if (cache[value]) {
        setData(cache[value]);
        return;
      }
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${value}`
      );
      const data = await response.json();
      setData(data?.recipes);
      setCache((prev) => ({ ...prev, [value]: data?.recipes }));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setShowSuggestions(false);
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 500);
    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return (
    <div className="wrapper">
      <h1>What's on your mind?</h1>
      <Search
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={searchRef}
      />

      {showSuggestions && (
        <ul className="suggestions">
          {data && data.map((d, index) => {
            return <Suggestions name={d.name} key={d?.id || index} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
