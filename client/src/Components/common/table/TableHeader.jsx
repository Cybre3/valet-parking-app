import React from 'react';

function TableHeader(props) {
    const sortColumn = { ...props.sortColumn };
    const { onSort } = props;

    const raiseSort = path => {
        if (sortColumn.path === path) sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        onSort(sortColumn);
    }

    const renderSortIcon = col => {
        const { sortColumn } = props;

        if (col.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>
        return <i className='fa fa-sort-desc'></i>
    }

    return (
        <thead>
            <tr>
                {
                    props.columns.map(col => (
                        <th
                            className='cursor-pointer px-4 py-2 text-md'
                            key={col.path || col.key}
                            onClick={() => raiseSort(col.path)}
                        >
                            {col.label} {renderSortIcon(col)}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeader;
