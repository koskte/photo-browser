import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PhotoDetail from "./Components/PhotoDetail";
import Pagination from "react-js-pagination";

const _ = require("lodash");

function App() {
  const [photos, setPhotos] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [photosPerPage] = useState(10);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photoRespone = await fetch(`https://jsonplaceholder.typicode.com/photos`);
      const photos = await photoRespone.json();
      setPhotos(photos);
      if (photos.length === 0) {
        setPageNum(1);
      }
    };
    fetchPhotos();
  }, []);

  const pageLastPhoto = pageNum * photosPerPage;
  const pageFirstPhoto = pageLastPhoto - photosPerPage;
  const photosToShow = photos.slice(pageFirstPhoto, pageLastPhoto);

  const thumbnails = () => {
    return _.map(photosToShow, (photo) => {
      return (
        <Link key={photo.id} to={`/${photo.id}`}>
          <img src={photo.thumbnailUrl} alt="thumbnail" className="Thumbnail" />
        </Link>
      );
    });
  };

  return (
    <Router>
      <div className="App">
        <Route exact path="/:id" component={PhotoDetail} />
        <div className="ThumbnailsContainer">{thumbnails()}</div>
        <div className="PaginationContainer">
          <Pagination
            activePage={pageNum}
            itemsCountPerPage={photosPerPage}
            totalItemsCount={photos.length}
            pageRangeDisplayed={5}
            onChange={(e) => setPageNum(e)}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
