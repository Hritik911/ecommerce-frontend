import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageSlider = ({ banners }) => {
  return (
    <div className="w-full h-48 md:h-[400px] mb-8 px-4 mt-4">
      <Swiper
        spaceBetween={15}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      >
        {banners.length > 0 ? (
          banners.map((item) => (
            <SwiperSlide key={item._id}>
              <img src={item.image}
               alt="Banner"
               className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              No Banners Uploaded Yet!
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default ImageSlider;