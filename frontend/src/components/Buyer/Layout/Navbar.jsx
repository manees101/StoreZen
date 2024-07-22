
import { Link } from 'react-router-dom'
import { navItems } from '../../../static/data'

const Navbar = ({active}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:h-full w-full`}>
         {
            navItems && navItems.map((i,index) => (
                <div key={index} className='flex'>
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-[#fff] bg-secondary px-4 py-2" : "text-black md:text-[#fff]"} mx-4 rounded-md hover:bg-secondary py-2 h-[40px] flex items-center font-[500] px-4 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar