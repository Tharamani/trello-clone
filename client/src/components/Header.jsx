import "./Header.css";
import logo from "../assets/applogo.png";

export const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="logo" />
      </div>
    </>
  );
};
