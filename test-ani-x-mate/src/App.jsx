import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import myImage from "./assets/anixmateLogo.png";
import squiggle from "./assets/squiggle.png";
import SearchIcon from "@mui/icons-material/Search";
const theme = createTheme({
 palette: {
  plain: {
   main: "#e5ecff",
  },
  accent: {
   main: "#82b8d7",
  },
 },
});

function App() {
 //  const [anime, setAnime] = useState([]);
 const [titles, setTitles] = useState([]);
 const [searchScreen, setSearchScreen] = useState(true);
 const [recomended, setRecomended] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [inputValue, setInputValue] = useState("");

 const handleChange = (event) => {
  setInputValue(event.target.value);
  console.log(inputValue);
 };

 const fetchData = () => {
  console.log("submit");
  // setIsLoading(true);
  // setSearchScreen(!searchScreen);
  // setTimeout(() => {
  //  fetch("http://127.0.0.1:5000/getRecomended")
  //   .then((response) => response.json())
  //   .then((data) => {
  //    setRecomended(data.rec.map((x) => [x.id, x.title, x.lg_img_url]));
  //    console.log(data);
  //    setIsLoading(false);
  //   })
  //   .catch((error) => {
  //    console.log(error);
  //   });
  // }, 5000);
 };

 useEffect(() => {
  fetch("http://127.0.0.1:5000/anime")
   .then((response) => response.json())
   .then((data) => {
    // setAnime(data.key.map((x) => x));
    setTitles(data.key.map((x) => x.title));
   })
   .catch((error) => console.error(error));
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
         style={{ width: "33%", alignSelf: "center" }}
        />
       </main>
      </div>
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
        <form
         method="post"
         action="http://127.0.0.1:5000/recommendation"
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
          // onClick={}
          sx={{ color: "#545d72", alignSelf: "end" }}
         >
          <SearchIcon color="action" /> Search
         </Button>
        </form>
       </main>
      </div>
     </>
    )}
   </div>
  </ThemeProvider>
 );
}

export default App;
