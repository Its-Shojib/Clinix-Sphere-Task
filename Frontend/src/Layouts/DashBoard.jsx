
import Navbar from '../Components/Navbar';
import { useForm } from "react-hook-form";

const DashBoard = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

            const healthDetails = {
                date: data.date,
                temp: parseFloat(data.temp) || 36.7,
                bp: data.bp || "120/80",
                heartRate: parseFloat(data.heartRate) || 75,
            }
            console.log(healthDetails);
    };

    return (
        <div className='max-w-screen-2xl mx-auto '>
            <Navbar />
            {/* dashboard content goes here */}

            <div className='flex justify-between items-center my-7 bg-stone-400 p-6 rounded-md'>
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
                    <button className="btn" onClick={() => document.getElementById('my_modal').showModal()}>New Health Record</button>
                </div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}

                <dialog id="my_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>

                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Date*</span>
                                </label>
                                <input {...register('date', { required: true })} type="date" className=" w-full p-2 border-2 outline-none" />
                            </div>
                        </div>



                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Temperature* (C)</span>
                                </label>
                                <input
                                    type="number"
                                    label="Temperature"
                                    placeholder="36.7"
                                    {...register('temp', { required: true })}
                                    required
                                    className="w-full p-2 border-2 outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Blood Pressure*</span>
                                </label>
                                <input
                                    type="text"
                                    label="bp"
                                    placeholder='120/80'
                                    {...register('bp', { required: true })}
                                    required
                                    className="w-full p-2 border-2 outline-none" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Heart Rate*</span>
                                </label>
                                <input
                                    type="number"
                                    label="heart Rate"
                                    placeholder='75'
                                    {...register('heartRate', { required: true })}
                                    required
                                    className="w-full p-2 border-2 outline-none" />
                            </div>
                        </div>

                        <button className="bg-green-900 text-white rounded-lg w-full p-2" type="submit">
                            Add Now!
                        </button>
                    </form>
                    </div>
                </dialog>
            </div>
        </div>
    )
}
export default DashBoard;