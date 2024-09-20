import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Navbar = () => {
    let { Logout } = useAuth();
    return (
        <div className="navbar bg-[#172935] text-white mt-2 rounded-md">
            <div className="flex-1">
                <button className="btn btn-ghost text-3xl">Health Care Tracking</button>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src= "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"   />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                        <li onClick={()=>Logout()} ><Link>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;