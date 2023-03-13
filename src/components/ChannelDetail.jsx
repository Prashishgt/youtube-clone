import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {Videos,ChannelCard} from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';



const ChannelDetail = () => {
  const {id} = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);
  console.log(channelDetail, videos);
  
  useEffect(()=>{
    fetchFromAPI(`channels?part="snippet&id=${id}`)
    .then((data)=> setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=> setvideos(data?.items));
  }, [id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{         
              background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 10%, rgba(7,53,150,1) 45%, rgba(0,212,255,1) 100%)',
              zIndex:10, height:'300px'
          }}          
        />
        <ChannelCard 
          channelDetail={channelDetail}
        />
      </Box>
    </Box>
  )
}

export default ChannelDetail