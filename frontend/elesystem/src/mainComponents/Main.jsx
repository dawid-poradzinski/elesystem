import { IconLockOpen } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-full">
            <div className="">
                <p className="text-transparent bg-clip-text bg-gradient-to-br from-sky-600 to-sky-800 text-4xl md:text-6xl pb-5"><span className="font-bold">ELES</span>ystem</p>
                <p className="text-2xl md:text-3xl tracking-wide">Witaj</p>
            </div>
            <Link to={`menu`}>
                <div className="flex items-center gap-3 w-fit justify-center text-white bg-gradient-to-br from-sky-600 to-sky-800 p-3 rounded-lg hover:brightness-110 shadow-xl transition duration-300 cursor-pointer">
                    <p>Wejdź do systemu</p>
                    <IconLockOpen size="20" />
                </div>
            </Link>
        </div>
    );
}

export default Main;