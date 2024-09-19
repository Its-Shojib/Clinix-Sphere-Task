
import Navbar from '../Components/Navbar';
import { useForm } from "react-hook-form";

const DashBoard = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {

            const biodatas = {
                Name: data?.name,
                PermanentDiv: data?.permanentDiv,
                PresentDiv: data?.presentDiv,
                PartnerAgeExp: data?.partnerAge,
                PartnerHeightExp: data?.partnerHeight,
                PartnerWeightExp: data?.partnerWeight,
                email: data?.email,
                Mobile: data?.phone,
            }
    };

    return (
        <div className='max-w-screen-2xl mx-auto '>
            <Navbar />
            {/* dashboard content goes here */}

            <div className='flex justify-between items-center my-10 bg-stone-400 p-6 rounded-md'>
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
                        <div className="flex gap-10">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Name*</span>
                                </label>
                                <input
                                    type="text"
                                    label="Name"
                                    {...register('name', { required: true })}
                                    className="w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Date of Birth*</span>
                                </label>
                                <input {...register('DoB', { required: true })} type="date" className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Weight*</span>
                                </label>
                                <select defaultValue="default" {...register('weight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Weight</option>
                                    <option value="41-50">41-50 Kilogram</option>
                                    <option value="51-60">51-60 Kilogram</option>
                                    <option value="61-70">61-70 Kilogram</option>
                                    <option value="71-80">71-80 Kilogram</option>
                                    <option value="81-90">81-90 Kilogram</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Ocupation*</span>
                                </label>
                                <select defaultValue="default" {...register('ocupation', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Ocupation</option>
                                    <option value="student">Student</option>
                                    <option value="job">Job</option>
                                    <option value="housewife">House Wife</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Race*</span>
                                </label>
                                <select defaultValue="default" {...register('race', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Race</option>
                                    <option value="asian">Asian</option>
                                    <option value="white">White</option>
                                    <option value="black">Black</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Permanent Division*</span>
                                </label>
                                <select defaultValue="default" {...register('permanentDiv', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Division</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chattagram">Chattagram</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Maymansign">Maymansign</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Present Division*</span>
                                </label>
                                <select defaultValue="default" {...register('presentDiv', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Division</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chattagram">Chattagram</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Maymansign">Maymansign</option>
                                    <option value="Sylhet">Sylhet</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Age*</span>
                                </label>
                                <input
                                    type="text"
                                    label="Age"
                                    {...register('age', { required: true })}
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Age (Expected)*</span>
                                </label>
                                <input
                                    type="text"
                                    label="Partner Age"
                                    {...register('partnerAge', { required: true })}
                                    className=" w-full" />
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Height* (Expected)</span>
                                </label>
                                <select defaultValue="default" {...register('partnerHeight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Height</option>
                                    <option value="5-0">{`5"0'`}</option>
                                    <option value="5-2">{`5"2'`}</option>
                                    <option value="5-4">{`5"4'`}</option>
                                    <option value="5-6">{`5"6'`}</option>
                                    <option value="5-8">{`5"8'`}</option>
                                    <option value="5-10">{`5"10'`}</option>
                                    <option value="6-0">{`6"0'`}</option>
                                    <option value="6-2">{`5"2'`}</option>
                                    <option value="6-4">{`5"4'`}</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Partner Weight* (Expected)</span>
                                </label>
                                <select defaultValue="default" {...register('partnerWeight', { required: true })}
                                    className="select select-bordered w-full py-2">
                                    <option disabled value="default">Select Weight</option>
                                    <option value="41-50">41-50 Kilogram</option>
                                    <option value="51-60">51-60 Kilogram</option>
                                    <option value="61-70">61-70 Kilogram</option>
                                    <option value="71-80">71-80 Kilogram</option>
                                    <option value="81-90">81-90 Kilogram</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-10 my-5">
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Contact Email*</span>
                                </label>
                                <input
                                    type="text"
                                    label="Email"
                                    {...register('email', { required: true })}
                                    required
                                    readOnly
                                    className="w-full" />
                            </div>
                            <div className="flex-1">
                                <label className="label">
                                    <span className="label-text">Phone Number*</span>
                                </label>
                                <input
                                    type="text"
                                    label="Phone Number"
                                    {...register('phone', { required: true })}
                                    required
                                    className=" w-full" />
                            </div>
                        </div>

                        <button className="block w-full text-lg" type="submit">
                            Save & Publish Now!
                        </button>
                    </form>
                    </div>
                </dialog>
            </div>
        </div>
    )
}
export default DashBoard;