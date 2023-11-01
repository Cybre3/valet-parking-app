import Joi from 'joi-browser'
import Form from './form/Form';

import { addCar } from '../store/cars';

class ValetEntry extends Form {
    state = {
        data: {
            date: new Date().toISOString().substring(0, 10),
            color: '',
            phoneNumber: '',
            make: '',
            model: '',
            lotLocation: ''
        },
        errors: {}
    }

    lotLocationOptions = [
        { id: 1, value: 'Front Lot, Row 1' },
        { id: 2, value: 'Front Lot, Row 2' },
        { id: 3, value: 'Front Lot, Row 3' },
        { id: 4, value: 'Front Lot, Row 4' },
        { id: 5, value: 'Circle' },
        { id: 6, value: 'Side Lot, Row 1' },
        { id: 7, value: 'Side Lot, Row 2' },
        { id: 8, value: 'Side Lot, Row 3' },
    ]

    schema = {
        _id: Joi.string(),
        date: Joi.date().required().label('Date'),
        color: Joi.string().required().label('Color'),
        phoneNumber: Joi.string().required().label('Phone Number'),
        make: Joi.string().required().label('Make'),
        model: Joi.string().required().label('Model'),
        lotLocation: Joi.string().required().label('Lot Location')
    }

    doSubmit = () => {
        addCar(this.state.data);
    }

    render() {
        return (
            <div className='w-1/4'>
                <form onSubmit={this.handleSubmit} className='space-y-2'>
                    <div className='flex'>
                        {this.renderInput('phoneNumber', 'Phone', 'phone')}
                        {this.renderInput('date', 'Date', 'date')}
                    </div>
                    {this.renderInput('color', 'Color')}
                    {this.renderInput('make', 'Make')}
                    {this.renderInput('model', 'Model')}
                    {this.renderDropdown('lotLocation', 'Lot Location', this.lotLocationOptions)}
                    {this.renderButton('Submit')}
                </form>
            </div>
        )
    }
}

export default ValetEntry;