import AppointmentCard from "./AppiomentCard";



const Landing = () => {
   console.log("dddddd");
   
    return (
      <div className="bg-gradient-to-b from-black to-slate-900 rounded-lg min-h-[710px] flex flex-col justify-center items-center">
        <div className=" text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent text-center">
          Hello, Doctor
        </div>
        <div className="text-5xl font-bold bg-gradient-to-r from-fuchsia-500 to-violet-700 bg-clip-text text-transparent text-center mt-8">
          <h2 className="text-lg text-slate-400 mb-3">Upcoming appointment</h2>
          <AppointmentCard />
        </div>
      </div>
    );
  };
  
  export default Landing;
  