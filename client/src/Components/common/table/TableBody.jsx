import React from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

function TableBody(props) {
    const navigate = useNavigate();

    const renderCell = (item, col) => {
        if (col.content) return col.content(item);

        return _.get(item, col.path);
    };

    const createKey = (item, col) => {
        return item._id + (col.path || col.key);
    };

    const { data, columns } = props;

    return (
        <tbody>
            {
                data.map(item => (
                    <tr key={item._id} className='border border-x-0 cursor-pointer hover:bg-neutral-200 hover:shadow-lg' onClick={() => navigate(`/cars/${item._id}`)}>
                        {
                            columns.map(col => (
                                <td key={createKey(item, col)} className='px-4 py-4'>
                                    {renderCell(item, col)}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    )
}

export default TableBody;