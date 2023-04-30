import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Pause from "@mui/icons-material/Pause";

interface Image {
  id: number;
  url: string;
  title: string;
  description: string;
}

interface Props {
  images: Image[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "1rem",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: "50px",
    objectFit: "contain",
  },
  h2: {
    fontSize: "3.125rem",
    color: "#707070",
  },
  paragraph: {
    fontSize: "1rem",
    color: "#707070",
  },
  thumbnail: {
    width: "15%",
    overflow: "scroll",
    objectFit: "cover",
    borderRadius: "20px",
    marginRight: theme.spacing(1),
    filter: "grayscale(100%)",
    "&.selected": {
      filter: "none",
    },
  },
}));

const CatalogViewer: React.FC<Props> = ({ images }) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  console.log(classes);
  const handlePrevClick = () => {
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const handlePlayPauseClick = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(() => {
        setSelectedImage((selectedImage + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [playing, selectedImage, images.length]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} sm={8} md={8} lg={7}>
          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].title}
            className={classes.image}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={4} lg={4}>
          <Typography variant='h2' className={classes.h2}>
            {images[selectedImage].title}
          </Typography>
          <Typography variant='subtitle1' className={classes.paragraph}>
            {images[selectedImage].description}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction='row'
        wrap='wrap'
        justifyContent='center'
        alignItems='center'
        style={{ marginTop: "1rem" }}
      >
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          wrap='nowrap'
          xs={12}
          lg={10}
        >
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid item>
              <ArrowLeftIcon
                onClick={handlePrevClick}
                sx={{ fontSize: "4rem" }}
              />
            </Grid>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.title}
                className={`${classes.thumbnail} ${
                  selectedImage === index ? "selected" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
            <Grid item></Grid>
            <ArrowRightIcon
              onClick={handleNextClick}
              sx={{ fontSize: "4rem" }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems='center' xs={12} sm={12} md={2} lg={2}>
          {playing ? (
            <Pause
              onClick={handlePlayPauseClick}
              sx={{ color: "#25BEDA", fontSize: "5rem" }}
            />
          ) : (
            <PlayCircleFilledIcon
              onClick={handlePlayPauseClick}
              sx={{ color: "#25BEDA", fontSize: "5rem" }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CatalogViewer;
