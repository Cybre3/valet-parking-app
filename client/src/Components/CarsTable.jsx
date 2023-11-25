import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';

import Table from './common/table/Table';


class CarsTable extends PureComponent {
    columns = [
        { path: 'phone', label: 'Phone #' },
        { path: 'make', label: 'Make' },
        { path: 'model', label: 'Model' },
        { path: 'lotLocation', label: 'Lot Location' },
    ];

    render() {
        const { onSort, sortColumn, data } = this.props;

        return (
            <Table data={data} onSort={onSort} sortColumn={sortColumn} columns={this.columns} />
        )
    }
}

export default CarsTable;