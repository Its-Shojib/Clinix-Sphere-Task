import Navbar from '../Components/Navbar';
import HealthRecordForm from '../Components/HealthRecordForm';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { FaSquarePlus } from "react-icons/fa6";
import UpdateRecord from '../Components/UpdateRecord';
import { useState } from 'react';

const DashBoard = () => {
    let axiosRoot = useAxios();
    let [updatedData, setUpdatedData] = useState({});

    const { data: allRecord = [], isPending, refetch } = useQuery({
        queryKey: ['allRecord'],
        queryFn: async () => {
            const res = await axiosRoot.get('/health-records');
            return res.data;
        }
    });


    const handleUpdate = (item) => {
        setUpdatedData(item);
        document.getElementById('my_modal2').showModal();
    }

    const HandleDeleteRecord = (recordId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await axiosRoot.delete(`/health-records/${recordId}`);
                if (res?.data?.result) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }


            }
        });

    }

    return (
        <div className='max-w-screen-2xl mx-auto px-2'>
            <Navbar />
            {/* dashboard content goes here */}

            <div className='flex flex-col md:flex-row gap-5 justify-between items-center my-7 bg-stone-400 p-6 rounded-md'>
                <div className='md:min-w-[800px]'>
                    <form action="">
                        <input
                            type="text"
                            name=""
                            placeholder='Search here...'
                            className='md:min-w-[500px] p-2 rounded-xl outline-none' />
                    </form>
                </div>
                <div>
                    <button className="btn" onClick={() => document.getElementById('my_modal').showModal()}><FaSquarePlus className='text-xl' />New Health Record</button>
                </div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}


            </div>
            {/* Filter those Data by date or filter by health metrics (e.g., heart rate above a certain threshold)*/}

            <div>
                {
                    allRecord.length > 0 ? <div>
                        {
                            isPending ? <>
                                <div className="text-center h-screen">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>
                            </> : <>
                                <div className="mt-10 max-w-[425px] md:max-w-full overflow-x-auto">
                                    <table className="table w-full table-zebra text-center">
                                        <thead>
                                            <tr className="">
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Index</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Date</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Temperature (C)</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Blood Pressure (BP)</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Heart Rate (BPM)</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">View/Update</th>
                                                <th className="border-b border-blue-gray-100 bg-blue-gray-50">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allRecord?.map((item, index) => <tr key={item?._id}>
                                                    <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                                                    <td className=" border-b border-blue-gray-50">
                                                        {item?.date}
                                                    </td>
                                                    <td className="p-4 border-b border-blue-gray-50">
                                                        {item?.temp}
                                                    </td>
                                                    <td className="p-4 border-b border-blue-gray-50">
                                                        {item?.bp}
                                                    </td>
                                                    <td className="p-4 border-b border-blue-gray-50">
                                                        {item?.heartRate}
                                                    </td>

                                                    <th
                                                        className="p-4 border-b border-blue-gray-50">
                                                        <button
                                                            onClick={() => handleUpdate(item)}
                                                            className="bg-blue-800 text-white rounded-md px-4 py-2">
                                                            View</button>
                                                    </th>
                                                    <th className="p-4 border-b border-blue-gray-50">
                                                        <button className="rounded-md px-4 py-2"
                                                            onClick={() => HandleDeleteRecord(item?._id)}><MdDelete className='text-2xl' /></button>
                                                    </th>
                                                </tr>
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                    </div> : <></>
                }
            </div>
            <dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <HealthRecordForm refetch={refetch} />
                </div>
            </dialog>
            <dialog id="my_modal2" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <UpdateRecord data={updatedData} refetch={refetch} />
                </div>
            </dialog>


        </div>
    )
}
export default DashBoard;