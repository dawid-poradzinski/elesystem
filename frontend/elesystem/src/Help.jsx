import { useEffect, useState } from "react";

function Help(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.info);
    }, [props.info])

    

    return ( 
        <div className="flex flex-col justify-center items-center">
            <p className="text-3xl p-4 text-white">Pomoc:</p>
            {data}
        </div>
     );
}

export default Help;