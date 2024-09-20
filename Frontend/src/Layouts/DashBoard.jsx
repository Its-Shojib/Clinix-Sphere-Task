import Navbar from '../Components/Navbar';
import HealthRecordForm from '../Components/HealthRecordForm';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';
// import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { FaSquarePlus } from "react-icons/fa6";
import UpdateRecord from '../Components/UpdateRecord';
import { useState } from 'react';
import DataTable from '../Components/DataTable';

const DashBoard = () => {
    let axiosRoot = useAxios();
    let [updatedData, setUpdatedData] = useState({});
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    let [heartRateThreshold, setHeartRateThreshold] = useState('');
    let [searchTerm, setSearchTerm] = useState('');

    const { data: allRecord = [], isPending, refetch } = useQuery({
        queryKey: ['allRecord'],
        queryFn: async () => {
            const res = await axiosRoot.get('/health-records');
            return res.data;
        }
    });

    const filteredRecords = allRecord.filter((record) => {
        const recordDate = new Date(record.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const meetsDateFilter = start && end ? recordDate >= start && recordDate <= end : true;

        const meetsHeartRateFilter = heartRateThreshold
            ? record.heartRate >= parseInt(heartRateThreshold)
            : true;

        const meetsSearchFilter = searchTerm
            ? record.email.includes(searchTerm) ||
            record.temp.toString().includes(searchTerm) ||
            record.bp.includes(searchTerm) ||
            record.heartRate.toString().includes(searchTerm)
            : true;

        return meetsDateFilter && meetsHeartRateFilter && meetsSearchFilter;
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
            {/* dashboard content */}

            <div className='flex flex-col md:flex-row gap-5 justify-between items-center my-7 bg-stone-400 p-6 rounded-md'>
                <div className='md:min-w-[800px]'>
                    <form action="">
                        <input
                            type="text"
                            placeholder='Search here...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='md:min-w-[500px] p-2 rounded-xl outline-none'
                        />
                    </form>
                </div>
                <div>
                    <button className="btn" onClick={() => document.getElementById('my_modal').showModal()}>
                        <FaSquarePlus className='text-xl' />New Health Record
                    </button>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 justify-center items-center my-6 bg-stone-100 rounded-md'>
                <div className='flex justify-center items-center gap-5'>
                    <div>
                        <label className='block mb-2'>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className='p-2 rounded-md border border-gray-300'
                        />
                    </div>
                    <div>
                        <label className='block mb-2'>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className='p-2 rounded-md border border-gray-300'
                        />
                    </div>
                </div>

                <div className='flex gap-4 justify-center items-center my-6'>
                    <div>
                        <label className='block mb-2'>Heart Rate Threshold (BPM):</label>
                        <input
                            type="number"
                            value={heartRateThreshold}
                            onChange={(e) => setHeartRateThreshold(e.target.value)}
                            placeholder='Enter heart rate threshold'
                            className='p-2 rounded-md border border-gray-300'
                        />
                    </div>
                </div>
            </div>

            <div>
                {
                    filteredRecords?.length > 0 ? (
                        <div>
                            {isPending ? (
                                <div className="text-center h-screen">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>
                            ) : (
                                <div className="mt-10 max-w-[425px] md:max-w-full overflow-x-auto">
                                    <DataTable
                                        filteredRecords={filteredRecords}
                                        handleUpdate={handleUpdate}
                                        HandleDeleteRecord={HandleDeleteRecord} />
                                </div>
                            )}
                        </div>
                    ) : <p className='text-center text-gray-500'>No records found</p>
                }
            </div>

            {/* Modals */}
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
    );
}

export default DashBoard;
