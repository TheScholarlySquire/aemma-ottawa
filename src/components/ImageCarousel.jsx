import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
    { src: './img/group1.jpg', alt: 'Group event' },
    { src: './img/b1.jpg', alt: 'Historical drills in action' },
    { src: './img/bc1.jpg', alt: 'Training with sidesword' },
    { src: './img/cs1.jpg', alt: 'Fencing' },
    { src: './img/mc1.jpg', alt: 'Fencing' },
];

export default function ImageCarousel() {
    return (
        <section className="bg-gray-100 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className="rounded-lg overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-[400px] object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
