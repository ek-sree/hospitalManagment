import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

interface AppointmentData {
  patientName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface AppointmentCardProps {
  appointment: AppointmentData;
}

const AppointmentCard: React.FC<AppointmentCardProps> = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/10 text-green-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 mb-4 backdrop-blur-sm border border-slate-700 hover:border-slate-600 transition-all duration-300 w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-violet-500" />
          <span className="text-white text-lg font-medium">Sreehari</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor('upcoming')}`}>
          Upcoming
        </span>
      </div>
      
      <div className="flex items-center space-x-6 text-slate-300">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-violet-500" />
          <span className="text-sm">Oct 30, 2024</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-violet-500" />
          <span className="text-sm">10:30 AM</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard