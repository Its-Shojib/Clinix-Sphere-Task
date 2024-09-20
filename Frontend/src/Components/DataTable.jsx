import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const DataTable = ({filteredRecords,handleUpdate,HandleDeleteRecord}) => {
    return (
        <table className="table w-full table-zebra text-center">
            <thead>
                <tr>
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
                {filteredRecords?.map((item, index) => (
                    <tr key={item?._id}>
                        <th className="p-4 border-b border-blue-gray-50">{index + 1}</th>
                        <td className="border-b border-blue-gray-50">{item?.date}</td>
                        <td className="p-4 border-b border-blue-gray-50">{item?.temp}</td>
                        <td className="p-4 border-b border-blue-gray-50">{item?.bp}</td>
                        <td className="p-4 border-b border-blue-gray-50">{item?.heartRate}</td>
                        <th className="p-4 border-b border-blue-gray-50">
                            <button
                                onClick={() => handleUpdate(item)}
                                className="bg-blue-800 text-white rounded-md px-4 py-2"
                            >
                                View
                            </button>
                        </th>
                        <th className="p-4 border-b border-blue-gray-50">
                            <button
                                className="rounded-md px-4 py-2"
                                onClick={() => HandleDeleteRecord(item?._id)}
                            >
                                <MdDelete className='text-2xl' />
                            </button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
DataTable.propTypes = {
    filteredRecords: PropTypes.array,
    handleUpdate: PropTypes.func,
    HandleDeleteRecord: PropTypes.func,
}
export default DataTable;