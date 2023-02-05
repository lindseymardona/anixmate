import "../styles/header.css";
import Avatar from "@mui/material/Avatar";

function Header() {
 return (
  <header className="flex-header">
   <div className="title">Ani x Mate</div>
   <Avatar
    alt="Remy Sharp"
    src="/static/images/avatar/1.jpg"
    sx={{ width: 56, height: 56 }}
   />
  </header>
 );
}
export default Header;
