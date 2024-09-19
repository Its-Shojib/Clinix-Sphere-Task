import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const UpdateRecord = ({data, refetch}) => {
    let {date, temp, bp, heartRate, _id} = data;
    const { register, handleSubmit, reset } = useForm();
    let { user } = useAuth();
    let axiosRoot = useAxios();

    const onSubmit = async (data) => {

        const updatedRecord = {
            date: data.date ||date,
            temp: parseFloat(data.temp) || temp,
            bp: data.bp || bp,
            heartRate: parseFloat(data.heartRate) || heartRate,
            email: user?.email,
        }

        let res = await axiosRoot.put(`/health-records/${_id}`, updatedRecord);
        console.log(res.data);
        if (res?.data?.result) {
            toast.success(`${res?.data?.message}`);
            refetch();
            reset();
        } else {
            toast.error(`${res?.data?.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-10 my-5">
                <div className="flex-1">
                    <label className="label">
                        <span className="label-text">Date*</span>
                    </label>
                    <input 
                    {...register('date', { required: true })} 
                    type="date" 
                    defaultValue={date}
                    className=" w-full p-2 border-2 outline-none" />
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
                        defaultValue={temp}
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
                        defaultValue={bp}
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
                        defaultValue={heartRate}
                        {...register('heartRate', { required: true })}
                        required
                        className="w-full p-2 border-2 outline-none" />
                </div>
            </div>

            <button className="bg-green-900 text-white rounded-lg w-full p-2" type="submit">
                Update Now!
            </button>
        </form>
    );
};
UpdateRecord.propTypes = {
    data: PropTypes.object,
    refetch: PropTypes.func
}
export default UpdateRecord;