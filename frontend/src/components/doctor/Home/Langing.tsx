import AppointmentCard from "./AppiomentCard";


const Landing = () => {
    

    return (
      <div className="bg-gradient-to-b from-black to-slate-900 rounded-lg min-h-[710px] flex flex-col justify-center items-center">
        <div className="mb-9 text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent text-center">
          Hello, Doctor
        </div>
        <h1 className="text-white font-semibold text-lg mb-7 border-b-2">Upcomming Appoiments.</h1>
        <AppointmentCard/>
      </div>
    );
  };
  
  export default Landing;
  