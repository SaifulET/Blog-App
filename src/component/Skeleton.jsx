import "../assets/Skeleton.css"
const Skeleton = () => {
    return (
        <div>
        <div className="skeleton-card ">
            <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-description short"></div>
          <div className="skeleton-description short"></div>
          <div className="skeleton-description short"></div>
          <div className="skeleton-description short"></div>
          <div className="skeleton-footer">
            <div className="skeleton-button"></div>
          </div>
        </div>
        </div>
    );
};

export default Skeleton;