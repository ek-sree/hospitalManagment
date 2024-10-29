export interface IBookAppoiment {
    _id: string;
    doctor: string;
    remarks: string;
    availableSlot: string;
    isStatus?:boolean;
    updatedAt:string;
  }
  