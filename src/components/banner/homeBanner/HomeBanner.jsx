import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "../css/banner.css";
// import Img from "../../../assets/images/banner.jpg"
import { useEffect } from "react";
import { getBannerList } from "../../../actions/homeAction/homeAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// let bannerList = [
//     {
//         id: 1,
//         img: Img,
//         title: "Performans Üçün Yaradılıb",
//         desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
//     },
//     {
//         id: 2,
//         img: Img,
//         title: "Performans Üçün Yaradılıb",
//         desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
//     },
//     {
//         id: 3,
//         img: Img,
//         title: "Performans Üçün Yaradılıb",
//         desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
//     }
// ]

const HomeBanner = () => {
    
const dispatch=useDispatch()

useEffect(()=>{
    dispatch(getBannerList())
},[dispatch])

const {bannerList}=useSelector(state=>state.home)
const navigate=useNavigate()

const targetPr=()=>{
    navigate("/products")
}
    return (
        <div>
            <Swiper
                spaceBetween={30}
                // hashNavigation={{
                //     watchState: true,
                // }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                // navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {bannerList?.map((banner, i) => (
                    <SwiperSlide className="home_banner_bg_img" data-hash="slide1" key={i} style={{background: `url(${banner?.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                        <div className="home_banner_yellow">
                            <h1>{banner?.title}</h1>
                            <p>{banner?.content}</p>
                            <button onClick={targetPr}>Məhsullara bax</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HomeBanner