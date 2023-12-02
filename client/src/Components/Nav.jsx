import { NavLink } from "react-router-dom";

const Nav = () => {
    const links = [
        { id: 1, path: '/cars/addcar', label: 'Add New Car' },
        { id: 2, path: '/cars/requested', label: 'Requested Cars' },
        { id: 3, path: '/cars', label: 'View All Cars' },
    ]

    return (
        <div className="bg-neutral-50 flex flex-col w-[15%] h-screen absolute">
            <div className="flex flex-col w-full mt-[60%] space-y-2">
                {
                    links.map(link => <NavLink key={link.id} className='text-lg hover:bg-[#00008b] hover:text-white p-3 pl-8 font-bold tracking-wide' to={link.path}>{link.label}</NavLink>)
                }
            </div>
            <div className="mt-auto border-4 border-[#00008b] m-1 text-sm pt-1">
                <i className="text-xl text-[#00008b] font-bold text-center block">ParkMe Valet</i>
                <p className="text-center mb-4">Employee ID: ms123456</p>
                <div className="w-full text-center pb-2">
                    <p>{new Date().toLocaleDateString()}</p>
                    <p>{new Date().toLocaleTimeString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Nav;