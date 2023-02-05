import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import myImage from "./assets/anixmateLogo.png";
import squiggle from "./assets/squiggle.png";
import SearchIcon from "@mui/icons-material/Search";
import { demo_data, demo_reccomendations } from "./demo/demo_data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";
const theme = createTheme({
 palette: {
  plain: {
   main: "#e5ecff",
  },
  accent: {
   main: "#82b8d7",
  },
  accent2: {
   main: "#ee9691",
  },
 },
});

function App() {
 //  const [anime, setAnime] = useState([]);
 const [titles, setTitles] = useState([]);
 const [searchScreen, setSearchScreen] = useState(true);
 const [recomended, setRecomended] = useState([]);
 const [inputValue, setInputValue] = useState("");
 const [swipe, setSwipe] = useState(0);
 const handleChange = (event) => {
  setInputValue(event.target.value);
  console.log(inputValue);
 };

 const [min, setMin] = useState(1);
 const [max, setMax] = useState(100);

 const fetchRecomended = () => {
  // setIsLoading(true);
  setSwipe(Math.floor(Math.random() * (max - min + 1)) + min);
  setSearchScreen(!searchScreen);

  // console.log(recomended);
  // fetch("http://127.0.0.1:5000/getRecomended")
  //  .then((response) => response.json())
  //  .then((data) => {
  //   setRecomended(data.rec.map((x) => [x.id, x.title, x.lg_img_url]));
  //   console.log(data);
  //   setIsLoading(false);
  //  })
  //  .catch((error) => {
  //   console.log(error);
  //  });
 };

 useEffect(() => {
  setTitles(demo_data.key.map((x) => x.title));
  setRecomended(demo_reccomendations);
  console.log(demo_reccomendations);
  console.log(titles);
  // fetch("http://127.0.0.1:5000/anime")
  //  .then((response) => response.json())
  //  .then((data) => {
  //   // setAnime(data.key.map((x) => x));
  // setTitles(data.key.map((x) => x.title));
  //  })
  //  .catch((error) => console.error(error));
 }, []);

 return (
  <ThemeProvider theme={theme}>
   <div
    className="App"
    style={{
     position: "relative",
     height: "100vh",
    }}
   >
    <img src={squiggle} alt="" height={"20%"} width={"100%"} />

    {!searchScreen ? (
     <>
      <div id="swiping">
       <main className="center-element">
        <img
         src={myImage}
         alt="My Image"
         style={{ width: "25%", alignSelf: "center" }}
        />

        <div
         style={{
          display: "flex",
          width: "75%",
          alignSelf: "center",
          justifyContent: "center",
         }}
        >
         <img
          src={demo_reccomendations[swipe].entry.images.jpg.large_image_url}
          alt=""
          className="shadow"
          width={"30%"}
          display={{ borderRadius: "20px" }}
         />
         <div
          width={"50vw"}
          className="text-m"
          style={{
           display: "flex",
           flexDirection: "column",
           justifyContent: "center",
           alignItems: "center",
           padding: "5px",
          }}
         >
          {demo_reccomendations[swipe].entry.title}
          <div
           style={{
            display: "flex",
            width: "250px",
            position: "relative",
           }}
          >
           <DangerousIcon
            fontSize="large"
            color="accent2"
            className="shadow"
            width={"50%"}
            style={{
             position: "absolute",
             left: 10,
            }}
           />
           <CheckCircleIcon
            fontSize="large"
            color="accent"
            className="shadow"
            width={"50%"}
            style={{
             position: "absolute",

             right: 10,
            }}
           />
          </div>
         </div>
        </div>
       </main>
      </div>
      <Button
       color="accent"
       variant="contained"
       type="submit"
       onClick={fetchRecomended}
       sx={{ color: "#545d72", width: "10rem" }}
      >
       Return
      </Button>
     </>
    ) : (
     <>
      <div id="landing-page">
       <main className="center-element">
        <img
         src={myImage}
         alt="My Image"
         style={{ width: "50%", alignSelf: "center" }}
        />
        <div
         //  method="post"
         //  action="http://127.0.0.1:5000/recommendation"
         style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "fit-content",
          alignSelf: "center",
         }}
        >
         <Autocomplete
          disablePortal
          id="searchvalue-box"
          options={titles}
          sx={{
           width: "75vw",
           alignSelf: "center",
          }}
          renderInput={(params) => (
           <TextField
            placeholder="Search for anime here"
            {...params}
            color="plain"
            sx={{
             background: "#e5ecff",
             marginBottom: 3,
             borderRadius: "inherit",
            }}
            name="name"
            onChange={handleChange}
            focused
           />
          )}
         />

         <Button
          color="accent"
          variant="contained"
          type="submit"
          onClick={fetchRecomended}
          sx={{ color: "#545d72", alignSelf: "end" }}
         >
          <SearchIcon color="action" /> Search
         </Button>
        </div>
       </main>
      </div>
     </>
    )}
   </div>
  </ThemeProvider>
 );
}

export default App;
