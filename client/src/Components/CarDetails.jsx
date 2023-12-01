import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getCarById, loadCars, returnCar } from '../store/cars';
import colourNameToHex from '../utilities/varColors';

function CarDetails(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const car = useSelector(getCarById(params.id));

    useEffect(() => {
        dispatch(loadCars());
    }, [dispatch]);

    const handleDelete = id => {
        dispatch(returnCar(id));
        window.location = '/cars';
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-fit border-2 rounded-md shadow-lg py-2 bg-neutral-50'>
                {
                    car.map(({ make, model, color, _id, phone, lotLocation }) => (
                        <div key={_id}>
                            <div className='px-4 py-1 space-x-2'>
                                <span className='text-lg font-bold'>Phone#</span>
                                <span className='!mr-20'>{phone}</span>
                                <input type='color' defaultValue={colourNameToHex(color)} disabled />
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
                                <button onClick={() => handleDelete(_id)} className='bg-neutral-400 px-4 py-1 w-fit rounded hover:bg-neutral-300 hover:shadow-md'>
                                    Return Car
                                </button>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default CarDetails
