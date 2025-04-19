
import Navbar from "../component/Navbar";
import Slider from "../component/Slider";

import HomeBlog from "../component/HomeBlog";
import VideoPlayer from "../component/VideoPlayer";
import Footer from "../component/Footer";
import Skeleton from "../component/Skeleton";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <Slider></Slider>
          

            <HomeBlog></HomeBlog>
            
            <Skeleton></Skeleton>

            <VideoPlayer></VideoPlayer>

            <Footer></Footer>
        </div>
    );
};

export default Home;
