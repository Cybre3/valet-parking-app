import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import CarsTable from './CarsTable';

import withRouter from '../utilities/withRouter';
import { loadCars } from '../store/cars';

class Cars extends PureComponent {
    state = {
        sortColumn: { path: 'make', order: 'asc' }
    }

    componentDidMount() {
        this.props.loadCars();
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { sortColumn } = this.state;
        const { cars: allCars } = this.props;
        let filtered = allCars;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        return { data: sorted }
    }

    render() {
        const { sortColumn } = this.state;
        const { data: cars } = this.getPageData();

        return (
            <div className='h-screen flex justify-center items-center'>
                <div className='w-fit border-2 rounded-md p-10 shadow-lg bg-neutral-50'>
                    <CarsTable cars={cars} sortColumn={sortColumn} onSort={this.handleSort} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    cars: state.entities.cars.list
});

const mapDispatchToProps = dispatch => ({
    loadCars: () => dispatch(loadCars())
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cars));