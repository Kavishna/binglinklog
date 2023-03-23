import { useState, useEffect } from "react";
import searchIcon from "./assets/search.svg";
import logo from "./assets/bing.png";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  // changed by onchange in form > input 'string'
  const [searchQuery, setSearchQuery] = useState("");
  //set the url by onclick in the form > button 'string'
  const [url, setUrl] = useState("");
  //set the url and search query onclick in the form > button
  // and delete the last item on handleDelete {search:'',url:''}
  const [links, setLinks] = useState([]);

  //initial data
  const dummy =
    "<html><body style='color: #00aeef;font-family: sans-serif;font-size: 30px;display: flex;justify-content: center;align-items: center;'><p>Enter a search term above</p></body></html>";

  // function that set url and the search to state
  function handleSearch(e) {
    setUrl("https://www.bing.com/search?q=" + searchQuery.replace(/ /g, "+"));
    setLinks([
      ...links,
      {
        search: searchQuery,
        url: "https://www.bing.com/search?q=" + searchQuery.replace(/ /g, "+"),
      },
    ]);
  }
  //function to delete last item of the [links] array
  const handleDelete = () => {
    const filteredLinks = links.slice(0, -1);
    setLinks(filteredLinks);
  };

  //function that saves [links] as a xlsx file
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(links);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <div className="App">
      {/* //appbar top navigation */}
      <div className="nav">
        {/* logo */}
        <img className="logo" src={logo} alt="logo" />
        {/* show the last item of the array  */}
        <div className="last-item">
          <p>
            {links.length !== 0
              ? links[links.length - 1].search
              : "no items available"}
          </p>
          {/* delete the last item */}
          {links.length !== 0 && (
            <button onClick={(e) => handleDelete()}>delete</button>
          )}
        </div>
        {/* xlsx file download button */}
        <button
          className="download"
          onClick={handleDownload}
          disabled={links.length === 0}
        >
          Download
        </button>
        {/* search input form */}
        <div className="form">
          <input
            className="search"
            type="text"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={(e) => handleSearch(e)}>
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </div>
      {/* preview of the search query */}
      <div className="frame">
        <iframe
          className="responsive-iframe"
          src={url}
          srcDoc={links.length === 0 ? dummy : undefined}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
