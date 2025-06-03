import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "../css/banner.css";
import Img from "../../../assets/images/banner.jpg"

let bannerList = [
    {
        id: 1,
        img: Img,
        title: "Performans Üçün Yaradılıb",
        desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
    },
    {
        id: 2,
        img: Img,
        title: "Performans Üçün Yaradılıb",
        desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
    },
    {
        id: 3,
        img: Img,
        title: "Performans Üçün Yaradılıb",
        desc: "Avtomobilinizin ehtiyacı olan yüksək keyfiyyətli hissələri WeOne ilə əldə edin."
    }
]

const HomeBanner = () => {
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
                    <SwiperSlide className="home_banner_bg_img" data-hash="slide1" key={i} style={{background: `url(${banner?.img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                        <div className="home_banner_yellow">
                            <h1>{banner?.title}</h1>
                            <p>{banner?.desc}</p>
                            <button>Məhsullara bax</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HomeBanner