import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from 'swiper/react'
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import 'swiper/css'
import 'swiper/css/free-mode';

const TopChartCard = ({song, i,handlePauseClick,handlePlayClick, activeSong, isPlaying}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-white text-base mr-3">{i+1}.</h3>
    <div className="w-full flex flex-row items-center justify-between">
      <img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} />
      <div className="flex-1 justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="font-bold text-base text-gray-400 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    <PlayPause 
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={handlePlayClick}

    />
    </div>
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({behaviour: 'smooth'})
  })
  console.log(data);
  const topPlays = data?.slice(0,5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({song, i, data}))
    dispatch(playPause(true));
  }
  return (
  <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full overflow-y-scroll scrollbar-hide h-screen flex flex-col'>
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">Top Charts</h2>
        <Link to="/top-charts">
          <p className="text-gray-300 text-base cursor-pointer">
            See More
          </p>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        {topPlays?.map((song,i)=>{
          return (
            <TopChartCard song={song}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song,i)}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i} 
            key={song.key}/>
          )
        })}
      </div>
    </div>
        <div className="w-full flex flex-col mt-8 mb-20">
        <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-bold text-2xl">Top Artists</h2>
        <Link to="/top-artists">
          <p className="text-gray-300 text-base cursor-pointer">
            See More
          </p>
        </Link>
      </div>
      <Swiper
      slidesPerView = "auto"
      spaceBetween={15}
      freeMode
      centeredSlides
      centeredSlidesBounds
      modules={[FreeMode]}
      className="mt-4"
      >
        {topPlays?.map((song,i) =>{
          return (
            <SwiperSlide
            key={song?.key}
            style = {{width: '25%', height: 'auto'}}
            className='shadow-lg rounded-full animate-slideright '

            >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} className='rounded-full w-full object-cover' />
                </Link>
            </SwiperSlide>
          )
        })}


      </Swiper>

        </div>
  </div>

  )
}

export default TopPlay;
