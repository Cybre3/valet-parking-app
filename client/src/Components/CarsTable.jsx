import React, { PureComponent } from 'react';

import Table from './common/table/Table';


class CarsTable extends PureComponent {

    columns = [
        { path: 'phone', label: 'Phone #' },
        { path: 'make', label: 'Make' },
        { path: 'model', label: 'Model' },
        { path: 'lotLocation', label: 'Lot Location' },
    ];

    timeRequestedColumn = { path: 'timeRequested', label: 'Time Requested' }

    render() {
        const { onSort, sortColumn, data, options } = this.props;

        return (
            <Table data={data} onSort={onSort} sortColumn={sortColumn} columns={options && options.requested ? [...this.columns, this.timeRequestedColumn] : this.columns} />
        )
    }
}

export default CarsTable;