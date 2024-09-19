import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const HealthRecordForm = ({refetch}) => {
    const { register, handleSubmit } = useForm();
    let { user } = useAuth();
    let axiosRoot = useAxios();

    const onSubmit = async (data) => {

        const healthDetails = {
            date: data.date,
            temp: parseFloat(data.temp) || 36.7,
            bp: data.bp || "120/80",
            heartRate: parseFloat(data.heartRate) || 75,
            email: user?.email,
        }
        console.log(healthDetails);

        let res = await axiosRoot.post("/health-records", healthDetails);
        if (res?.data?.result) {
            toast.success(`${res?.data?.message}`);
            refetch();
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
    );
};
HealthRecordForm.propTypes = {
    refetch: PropTypes.func,
}
export default HealthRecordForm;