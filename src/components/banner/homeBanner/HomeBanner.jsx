import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "../css/banner.css";
import Img1 from "../../../assets/images/banner1.jpg"
import Img2 from "../../../assets/images/banner2.jpg"
import Img3 from "../../../assets/images/banner3.jpg"
import { useEffect } from "react";
import { getBannerList, getSettingsList } from "../../../actions/homeAction/homeAction";
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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBannerList())
        dispatch(getSettingsList())
    }, [dispatch])

    const { bannerList, settingsList } = useSelector(state => state.home)
    const navigate = useNavigate()

    const targetPr = () => {
        navigate("/products")
    }
    return (
        <div>
            <Swiper
    spaceBetween={30}
    pagination={{ clickable: true }}
    loop={true}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false,
    }}
    effect="fade"
    fadeEffect={{ crossFade: true }}
    modules={[Pagination, Navigation, Autoplay, EffectFade]}
    className="mySwiper"
>
                {/* {bannerList?.map((banner, i) => (
                    <SwiperSlide className="home_banner_bg_img" data-hash="slide1" key={i} style={{background: `url(${banner?.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
                        <div className="home_banner_yellow">
                            <h1>{banner?.title}</h1>
                            <p>{banner?.content}</p>
                            <button onClick={targetPr}>Məhsullara bax</button>
                        </div>
                    </SwiperSlide>
                ))} */}

                <SwiperSlide className="home_banner_bg_img" data-hash="slide1" style={{ background: `url(${Img1})`, backgroundSize: "cover", backgroundPosition: "left", backgroundRepeat: "no-repeat" }}>
                    <div className="home_banner_yellow1">
                        <img src={settingsList[0]?.logo} alt="" />
                        <h1>Performans Üçün Yaradılsa da, Keyfiyyətlə Möhkəmlənir</h1>
                        <p>Avtomobiliniz üçün lazım olan yüksək keyfiyyətli ehtiyat hissələrini WeOneGroup ilə təhlükəsiz və rahat şəkildə əldə edin.</p>
                        {/* <button onClick={targetPr}>Məhsullara bax</button> */}
                    </div>
                </SwiperSlide>
                <SwiperSlide className="home_banner_bg_img" data-hash="slide2" style={{ background: `url(${Img2})`, backgroundSize: "cover", backgroundPosition: "right", backgroundRepeat: "no-repeat" }}>
                    <div className="home_banner_yellow2">
                        <h1>Avtomobilinizin Gücü Doğru Seçimlə Başlayır</h1>
                        {/* <p>Premium materiallar, uzunömürlü istifadə və tam uyğunluq — bunların hamısı WeOneGroup-un təklif etdiyi keyfiyyətdədir.</p> */}
                        <button onClick={targetPr}>Məhsullara bax</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="home_banner_bg_img" data-hash="slide3" style={{ background: `url(${Img3})`, backgroundSize: "cover", backgroundPosition: "right", backgroundRepeat: "no-repeat" }}>
                    <div className="home_banner_yellow3">
                        <h1>Keyfiyyətli Hissələr, Daha Güclü Maşın</h1>
                        <p>WeOneGroup ilə avtomobilinizin performansını artıran düzgün hissələri asanlıqla tapın.</p>
                        <button onClick={targetPr}>Məhsullara bax</button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default HomeBanner