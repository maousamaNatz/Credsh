import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { VendorCard, ProductCard, ArticleCard, TestimonialCard } from "@/common/card";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CardCarousel = ({
    items,
    type = "vendor",
    spaceBetween = 30,
    slidesPerView = 1,
    autoplayDelay = 2000,
    loop = true,
    autoplay = true,
    navigation = true,
    pagination = false,
    breakpoints = {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
    className = "py-8"
}) => {
    const renderCard = (item) => {
        switch(type) {
            case "vendor":
                return <VendorCard vendor={item} />;
            case "product":
                return <ProductCard product={item} />;
            case "article":
                return <ArticleCard article={item} />;
            case "testimonial":
                return <TestimonialCard testimonial={item} />;
            default:
                return <VendorCard vendor={item} />;
        }
    };

    return (
        <div className="relative">
            {navigation && (
                <div className="swiper-custom-navigation">
                    <button className="swiper-custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg">
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                                fill="#0F0F0F"
                            />
                        </svg>
                    </button>
                    <button className="swiper-custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg">
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.82054 20.7313C8.21107 21.1218 8.84423 21.1218 9.23476 20.7313L15.8792 14.0868C17.0505 12.9155 17.0508 11.0167 15.88 9.84497L9.3097 3.26958C8.91918 2.87905 8.28601 2.87905 7.89549 3.26958C7.50497 3.6601 7.50497 4.29327 7.89549 4.68379L14.4675 11.2558C14.8581 11.6464 14.8581 12.2795 14.4675 12.67L7.82054 19.317C7.43002 19.7076 7.43002 20.3407 7.82054 20.7313Z"
                                fill="#0F0F0F"
                            />
                        </svg>
                    </button>
                </div>
            )}

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                navigation={navigation ? {
                    prevEl: ".swiper-custom-prev",
                    nextEl: ".swiper-custom-next",
                } : false}
                pagination={pagination ? {
                    clickable: true,
                    el: '.swiper-custom-pagination'
                } : false}
                loop={loop}
                autoplay={autoplay ? {
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                } : false}
                breakpoints={breakpoints}
                className={className}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        {renderCard(item)}
                    </SwiperSlide>
                ))}
            </Swiper>
            {pagination && <div className="swiper-custom-pagination mt-4 flex justify-center" />}
            <style jsx>{`
                .swiper-custom-pagination .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: #e5e7eb;
                    opacity: 1;
                    margin: 0 4px;
                }
                .swiper-custom-pagination .swiper-pagination-bullet-active {
                    background: #dc2626;
                }
                .swiper-custom-prev:hover,
                .swiper-custom-next:hover {
                    background: #dc2626;
                    color: white;
                }
                .swiper-custom-prev:hover i,
                .swiper-custom-next:hover i {
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default CardCarousel;
