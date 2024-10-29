import { FC, useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ErrorStates } from "../../../interface/ErrorInterface";
import { userEndpoints } from "../../../constraints/endpoints/userEndpoints";
import { toast, Toaster } from "sonner";
import CircularProgress from '@mui/material/CircularProgress';
import { IBookAppoiment } from "../../../interface/IBookAppioment";
import { createUserAxios } from "../../../constraints/axios/userAxios";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (Product: IBookAppoiment) => void;
}

const BookingModal: FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [doctor, setDoctor] = useState('');
  const [remarks, setRemarks] = useState('');
  const [availableSlot, setAvailableSlot] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorStates>({
    doctor: '',
    remarks: '',
    availableSlot: ''
  });

  const userAxios = createUserAxios(null)


  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ErrorStates = {
      doctor: '',
      remarks: '',
      availableSlot: ''
    };

    if (!doctor.trim()) {
      newErrors.doctor = "Doctor is required";
      isValid = false;
    }

    if (!remarks.trim()) {
      newErrors.remarks = "Remarks are required";
      isValid = false;
    }

    if (!availableSlot) {
      newErrors.availableSlot = "Available slot is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!userAxios) {
        toast.error("Some credentials are missing, please login again");
        return;
      }
      if (validateForm()) {
        const formData = new FormData();
        formData.append('doctor', doctor);
        formData.append('remarks', remarks);
        formData.append('availableSlot', availableSlot);

        const response = await userAxios.post(`${userEndpoints.bookAppoinment}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          onSuccess(response.data.data);
          toast.success("Booking successfully!");
          onClose();
        }
      }
    } catch (error) {
      console.log("Error occurred while booking appointment", error);
      toast.error("Can't add booking now, something happened!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Toaster expand={false} position="top-center" richColors />
      <div className="w-full max-w-md bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Booking Appointment</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <CloseOutlinedIcon fontSize="large" />
          </button>
        </div>

        <div className="space-y-6">
    
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-white mb-1">Doctor*</label>
            <select
              id="doctor"
              className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="" className="bg-slate-800 text-white">Select a doctor</option>
              <option value="Doctor 1" className="bg-slate-600 text-white">Doctor 1</option>
              <option value="Doctor 2" className="bg-slate-600 text-white">Doctor 2</option>
              <option value="Doctor 3" className="bg-slate-600 text-white">Doctor 3</option>
             
            </select>
            {errors.doctor && <p className="mt-1 text-red-300 text-sm">{errors.doctor}</p>}
          </div>

      
          <div>
            <label htmlFor="availableSlot" className="block text-sm font-medium text-white mb-1">Available Slot*</label>
            <select
              id="availableSlot"
              className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              value={availableSlot}
              onChange={(e) => setAvailableSlot(e.target.value)}
            >
              <option value="" className="bg-slate-800 text-white">Select an available slot</option>
              <option value="9:00 AM - 10:00 AM" className="bg-slate-600 text-white">9:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM" className="bg-slate-600 text-white">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM" className="bg-slate-600 text-white">11:00 AM - 12:00 PM</option>
        
            </select>
            {errors.availableSlot && <p className="mt-1 text-red-300 text-sm">{errors.availableSlot}</p>}
          </div>

          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-white mb-1">Remarks*</label>
            <input
              type="text"
              id="remarks"
              className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {errors.remarks && <p className="mt-1 text-red-300 text-sm">{errors.remarks}</p>}
          </div>

  
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Book Appointment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
