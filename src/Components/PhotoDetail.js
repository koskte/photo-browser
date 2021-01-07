import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactDom from "react-dom";
import "./PhotoDetail.css";

function PhotoDetail({ location }) {
  const [user, setUser] = useState({});
  const [album, setAlbum] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [singlePhoto, setSinglePhoto] = useState({});
  const [doneLoading, setDoneLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchPhotoAlbumAndUser = async () => {
      const singlePhotoPromise = await fetch(`https://jsonplaceholder.typicode.com/photos${location.pathname}`);
      const singlePhoto = await singlePhotoPromise.json();
      setSinglePhoto(singlePhoto);

      const albumPromise = await fetch(`https://jsonplaceholder.typicode.com/albums/${singlePhoto.albumId}`);
      const album = await albumPromise.json();
      setAlbum(album);

      const userPromise = await fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
      const user = await userPromise.json();
      setUser(user);
      setDoneLoading(true);
    };

    fetchPhotoAlbumAndUser();
  }, [singlePhoto.albumId, location.pathname]);

  return ReactDom.createPortal(
    <div className="Container">
      {doneLoading ? (
        <div className="Content">
          <button onClick={() => history.goBack()} className="BackButton">
            Back
          </button>
          <div className="ImageContainer">
            <h3>{singlePhoto.title}</h3>
            <img className="Image" src={singlePhoto.url} alt="large" />
          </div>

          <div className="ImageDetail">
            <div className="BasicInfo">
              <h3>From album: {album.title}</h3>
              <h4 onClick={() => setShowUserInfo(!showUserInfo)}>
                From user: <p className="UserName">{user.name}</p>
              </h4>
            </div>

            {showUserInfo && (
              <div className="UserInfo">
                <div className="ContactInfo">
                  <strong>Contact Info:</strong>
                  <p>{user.name}</p>
                  <p>{user.phone}</p>
                  <p>{user.email}</p>
                </div>

                <div className="CompanyInfo">
                  <strong>Company:</strong>
                  <p>{user.company.name}</p>
                  <p>{user.company.catchPhrase}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="Content">
          <h1>Loading Image...</h1>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
}

export default PhotoDetail;
