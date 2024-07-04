import { useSelector } from "react-redux";
import RegisteredUserNavBar from "./RegisteredUserNavBar";
import GuestNavBar from "./GuestNavBar";
import ManagerNavBar from "./ManagerNavBar";

/*לבדוק האם מנהל*/
const NavBar = () => {
    let user = useSelector(state => state.userState.currentUser);
    if (!user)
        return (
            <div className="nbar-style" style={{ zIndex:"1", position: "fixed",top:0}}> 
                <GuestNavBar />
            </div>
        )
    else if (user.role === 'admin')
        return (
            <div className="nbar-style " style={{ zIndex:1, position: "fixed",top:0}}>
                <ManagerNavBar />
            </div>)
    return (
        <div className="nbar-style" style={{ zIndex:"1", position: "fixed",top:0}}>
            <RegisteredUserNavBar />
        </div>
    );
}

export default NavBar;



