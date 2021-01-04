
import './PhotoDetail.css';
function PhotoDetail({ location }) {
    console.log(location)
    const singlePhoto = location.state.fromAppComponent;
    return (
        <div className="Container">
            <div className="Content">
                <p>{location.state.fromAppComponent.title}</p>
                <img className="center" src={singlePhoto.url} alt="large" />
            </div>
        </div>
    );
}


export default PhotoDetail;