import Joi from 'joi-browser'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Form from './common/form/Form';

import { addCar, getCarByPhoneMakeModel, loadCars } from '../store/cars';
import { sendMessage } from '../store/sms';

import arrowIcon from '../assets/right-entry-arrow-icon.png';

class ValetEntry extends Form {
    state = {
        data: {
            date: new Date().toISOString().substring(0, 10),
            color: '',
            phone: '',
            make: '',
            model: '',
            // carEnteredBy: ''
        },
        redirect: false,
        savedCarId: '',
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        date: Joi.date().required().label('Date'),
        color: Joi.string().required().label('Color'),
        phone: Joi.string().required().label('Phone Number'),
        make: Joi.string().required().label('Make'),
        model: Joi.string().required().label('Model'),
    }

    doSubmit = async () => {
        try {
            const car = this.state.data;
            const message = 'Thank you for using Parkme Valet.\nTo request your car, please respond to this message "READY".';

            await this.props.addCar(car);
            await this.props.loadCars();
            const [{ _id }] = await this.props.savedCar(car);
            this.props.sendSMS({ message, carId: _id, phone: car.phone });

            this.setState({ redirect: true, savedCarId: _id });
        } catch (error) {
            console.log(error)
        }
    }

    submitBtn = () => <img src={arrowIcon} alt='arrowIcon' className='w-10 cursor-pointer' />

    render() {
        return (
            this.state.redirect ?
                <Navigate to={`/lotLocation/${this.state.savedCarId}`} /> :
                <div className="flex justify-center items-center h-screen ml-[15%] overflow-hidden">

                    <div className='entry-box w-fit border-4 rounded-md p-8 shadow-lg bg-neutral-50'>
                        <form onSubmit={this.handleSubmit} className='space-y-10 text-sm'>

                            <h2 className='font-bold text-center w-full text-xl tracking-wide'>New Car Entry</h2>

                            <div className='flex space-x-6'>
                                {this.renderInput('phone', 'Phone', 'phone')}
                                {this.renderInput('date', 'Date', 'date')}
                            </div>
                            <div className='space-y-6 flex flex-col items-center'>
                                {this.renderInput('color', 'Color')}
                                {this.renderInput('make', 'Make')}
                                {this.renderInput('model', 'Model')}
                            </div>
                            {this.renderButton(this.submitBtn(), '', 'valetBtn', 'bg-transparent')}
                        </form>

                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    cars: state.entities.cars.list,
    savedCar: obj => getCarByPhoneMakeModel(obj)(state)
});

const mapDispatchToProps = dispatch => ({
    loadCars: () => dispatch(loadCars()),
    addCar: car => dispatch(addCar(car)),
    sendSMS: smsObj => dispatch(sendMessage(smsObj))
});


export default connect(mapStateToProps, mapDispatchToProps)(ValetEntry);