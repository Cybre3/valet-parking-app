import Joi from 'joi-browser'
import { connect } from 'react-redux';

import Form from './common/form/Form';

import { assignCarlotLocation, loadCars } from '../store/cars';

import arrowIcon from '../assets/right-entry-arrow-icon.png';
import withRouter from '../utilities/withRouter';

class ValetEntry extends Form {
    state = {
        data: {
            lotLocation: ''
        },
        redirect: false,
        errors: {}
    }

    componentDidMount() {
        this.props.loadCars();
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
        lotLocation: Joi.string().required().label('Lot Location')
    }

    doSubmit = async () => {
        try {
            await this.props.assignCarlotLocation(this.props.params.id, this.state.data);
            window.location = '/cars';
        } catch (error) {
            console.log(error)
        }
    }

    submitBtn = () => <img src={arrowIcon} alt='arrowIcon' className='w-10 cursor-pointer' />

    render() {
        return (
            <div className='h-screen flex justify-center items-center ml-[15%]'>
                <div className='entry-box w-fit border-4 rounded-md p-10 shadow-lg bg-neutral-50'>
                    <form onSubmit={this.handleSubmit} className='space-y-12'>
                        <div className='space-y-6 flex flex-col items-center'>
                            {this.renderDropdown('lotLocation', 'Lot Location', this.lotLocationOptions)}
                        </div>
                        {this.renderButton(this.submitBtn(), '', 'valetBtn', 'bg-transparent')}
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cars: state.entities.cars.list
});

const mapDispatchToProps = dispatch => ({
    assignCarlotLocation: (id, lotLocation) => dispatch(assignCarlotLocation(id, lotLocation)),
    loadCars: () => dispatch(loadCars())
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ValetEntry));