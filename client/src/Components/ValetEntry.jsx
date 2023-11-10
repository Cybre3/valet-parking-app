import Joi from 'joi-browser'
import { connect } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';

import Form from './common/form/Form';

import { addCar, getCarByPhoneMakeModel, loadCars } from '../store/cars';

import arrowIcon from '../assets/right-entry-arrow-icon.png';

class ValetEntry extends Form {
    state = {
        data: {
            date: new Date().toISOString().substring(0, 10),
            color: '',
            phone: '',
            make: '',
            model: '',
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
            await this.props.addCar(this.state.data);
            await this.props.loadCars();
            const [{ _id }] = this.props.savedCar(this.state.data);

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
                <div className="flex justify-center items-center h-screen">

                    <div className='entry-box w-fit border-4 rounded-md p-10 shadow-lg bg-neutral-50'>
                        <form onSubmit={this.handleSubmit} className='space-y-12'>
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
                        <NavLink to='/cars' className='bg-neutral-400 px-4 py-2 w-fit rounded text-lg hover:bg-neutral-300 hover:shadow-md' >See all cars</NavLink>
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
});


export default connect(mapStateToProps, mapDispatchToProps)(ValetEntry);