const Landing = () => {
    return (
      <div className="bg-gradient-to-b from-black to-slate-900 rounded-lg min-h-[710px] flex flex-col justify-center items-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent text-center">
          Hello, ssss
        </div>
        <div className="text-5xl font-bold bg-gradient-to-r from-fuchsia-500 to-violet-700 bg-clip-text text-transparent text-center mt-8">
          <button className="text-white text-xl border border-slate-700 bg-slate-800 px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-400 transition duration-300 transform hover:scale-105">
            Book Appointment
          </button>
        </div>
      </div>
    );
  };
  
  export default Landing;
  