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

    calcMargin = () => {
        return window.screen.width * 0.15;
    }

    render() {
        const { sortColumn } = this.state;
        const { data: cars } = this.getPageData();

        return (
            <div className={`h-screen flex justify-center items-center ml-[15%]`}>
                <div className='bg-neutral-50 border-2 rounded-md shadow-lg w-fit'>
                    <h2 className='font-bold text-center w-full mt-10 text-xl tracking-wider'>All Cars</h2>
                    <div className='p-10 px-5'>
                        <CarsTable data={cars.length === 0 ? [] : cars} sortColumn={sortColumn} onSort={this.handleSort} />
                    </div>
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