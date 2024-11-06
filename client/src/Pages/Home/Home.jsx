// import { useLoaderData } from "react-router-dom";
import Swiperr from "../../Components/Swiper/Carousel";
import TabCategory from "../../Components/TabCategory/TabCategory";

const Home = () => {
    // const jobs = useLoaderData();
    // console.log(jobs);
    return (
        <div>
            <Swiperr></Swiperr>
            {/* <TabCategory jobs={jobs}></TabCategory> */}
            <TabCategory></TabCategory>
        </div>
    );
};

export default Home;