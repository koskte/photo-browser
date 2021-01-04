import './App.css';
import { useState , useEffect } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PhotoDetail from './Components/PhotoDetail';
const _ = require('lodash');
function App() {
  const [photos, setPhotos] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  

  useEffect(() => {
    async function fetchPhotos () {
      const photoRespone = await fetch(`http://jsonplaceholder.typicode.com/photos?_page=${pageNum}`);
      const photos = await photoRespone.json();
      setPhotos(photos);
      console.log(photos)
      if (photos.length === 0) {
        setPageNum(1);
      }
    }
    fetchPhotos();
  }, [pageNum]);
  
  const thumbnails = () => {
    return _.map(photos, (photo) => {
    return ( 
      <Link key={photo.id} 
        to={{
          pathname: `/${photo.id}`,
          state: {fromAppComponent: photo}
        }}>
        <img src={photo.thumbnailUrl} alt="thumbnail" />
      </Link>
    )
    })
  }
  return (
  <Router>
    <div className="App">
      <Route exact path="/:id" component={PhotoDetail}/>
      {thumbnails()}
      <button onClick={() => {setPageNum(pageNum-1)}}>prev page</button>
      <button onClick={() => {setPageNum(pageNum+1)}}>next page</button>
    </div>
  </Router>
  );
}

export default App;
