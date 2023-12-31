import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getCarById, loadCars, returnCar } from '../store/cars';
import { sendCarInTransitSMS } from '../store/sms';
import colourNameToHex from '../utilities/varColors';

function CarDetails(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const car = useSelector(getCarById(params.id));
    const [carInTransit, setCarInTransit] = useState(false);

    useEffect(() => {
        dispatch(loadCars());
    }, [dispatch]);

    const handleDelete = id => {
        dispatch(returnCar(id));
        window.location = '/cars';
    }

    const handleCarInTransit = phone => {
        const message = 'Your car is on the way!';

        try {
            dispatch(sendCarInTransitSMS({ message, carId: params.id, phone }))
            setCarInTransit(true);
            // if (carInTransit) {
            // } else {

            // }
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <div className='h-screen flex justify-center items-center ml-[15%]'>
            <div className='w-fit border-2 rounded-md shadow-lg py-2 bg-neutral-50'>
                {
                    car.map(({ make, model, color, _id, phone, lotLocation, returnInProgress }) => (
                        <div key={_id}>
                            <div className='px-4 py-1 space-x-2'>
                                <span className='text-lg font-bold'>Phone#</span>
                                <span className='!mr-20'>{phone}</span>
                                <input type='color' defaultValue={colourNameToHex(color)} disabled />
                                {/* <button onClick={() => handleDelete(_id)}>Force Delete</button> */}
                            </div>
                            <p className='mx-auto text-center w-full'>{lotLocation}</p>
                            <div className='flex space-x-10 p-6 pt-0 justify-center'>
                                <div>
                                    <h2 className='text-lg font-bold'>Make</h2>
                                    <span>{make}</span>
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold'>Model</h2>
                                    <span>{model}</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between px-1.5'>
                                <NavLink to='/cars' className='fa fa-arrow-left bg-neutral-400 px-4 py-2 w-fit rounded hover:bg-neutral-300 hover:shadow-md'>
                                    <span className='ml-1'>
                                        {'Back to cars'}
                                    </span>
                                </NavLink>
                                {
                                    !returnInProgress && !carInTransit ?
                                        <button onClick={() => handleCarInTransit(phone)} className='bg-neutral-400 px-4 py-1 w-fit rounded hover:bg-neutral-300 hover:shadow-md'>
                                            Car In Transit
                                        </button> :
                                        <button onClick={() => handleDelete(_id)} className='bg-neutral-400 px-4 py-1 w-fit rounded hover:bg-neutral-300 hover:shadow-md'>
                                            Return Car
                                        </button>
                                }
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default CarDetails
