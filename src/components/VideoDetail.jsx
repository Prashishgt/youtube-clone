import React, { useState, useEffect } from "react";
import { Link, Links, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();

  const [videoDetails, setvideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setvideoDetails(data?.items[0]))
      .catch((e) => console.log(e));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data)=> setVideos(data.items));
     
  }, [id]);
  console.log(videoDetails);
  if (!videoDetails?.snippet) return 'Loading...';
  const { snippet: { title, channelId, channelTitle }, statistics: {viewCount, likeCount} } = videoDetails;
  return (
    <Box minHeight="95vh">
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
      >
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              className="react-player"
              controls
              url={`https://www.youtube.com/watch?v=${id}`}
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
              <Stack direction='row' justifyContent='space-between' sx={{
                color:'#fff'
              }} py={1} px={2}>
                <Link to={`/channel/${channelId}`}>
                  <Typography variant={{ sm: 'subtitle1', md:'h6'}} color='#fff'>
                    {channelTitle}
                    <CheckCircle sx={{ fontSize:'12px', color:'gray', ml:'5px' }}/>
                  </Typography>
                </Link>
                <Stack direction='row' gap='20px' alignItems='center'> 
                  <Typography variant="body1" sx={{opacity:0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant="body1" sx={{opacity:0.7}}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>        
            </Typography>
          </Box>
        </Box>
        <Box px={2} py={{md:1, sx:5}} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='column'/>
      </Box>
      </Stack>

      
    </Box>
  );
};

export default VideoDetail;
