import Landing from "../../../components/user/Home/Landing"
import SideNav from "../../../components/user/Home/SideNav"

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 min-h-screen p-3 flex">
    <SideNav/>
    <div className="flex-1 ml-2">
      
    <Landing/>
    </div>
  
</div>
  )
}

export default HomePage