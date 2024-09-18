import { NavLink,Link, Outlet } from 'react-router-dom';
import { FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";


const DashBoard = () => {
    return (
        <div>
            <div className="max-w-full mx-auto flex">
                <div className="w-64 h-screen bg-[#172935] text-white sticky top-0">
                    <div className='text-center my-10'>
                        <h1 className='text-3xl font-bold'>Milon Mela</h1>
                        <p className='text-xl'>Matrimony</p>
                    </div>
                    <>
                        <ul className='menu flex flex-col mt-10 px-6 space-y-3'>
                            <li >
                                <NavLink className='flex items-center font-bold gap-2'
                                    to='/' >
                                    <FaInfoCircle ></FaInfoCircle>My Records</NavLink>
                            </li>
                            <li >
                                <NavLink className='flex items-center font-bold gap-2'
                                    to='/new-records' >
                                    <CiCirclePlus></CiCirclePlus>Add New Records</NavLink>
                            </li>

                            <li >
                                <Link onClick={() => Logout().then().catch()} className='flex items-center font-bold gap-2' ><FaSignOutAlt></FaSignOutAlt> Logout</Link>
                            </li>
                        </ul>
                    </>

                </div>
                <div className="flex-1 bg-gray-200 overflow-y-scroll">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}
export default DashBoard;