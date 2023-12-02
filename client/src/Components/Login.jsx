import Joi from 'joi-browser'
// import { connect } from 'react-redux';
// import { Navigate } from 'react-router-dom';

import Form from './common/form/Form'

class Login extends Form {
    state = {
        data: {
            date: new Date().toISOString().substring(0, 10),
            username: '',
            password: ''
        },
        redirect: false,
        savedCarId: '',
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        date: Joi.date().required().label('Date'),
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    render() {
        return (
            <div className="flex justify-center items-center h-screen overflow-hidden">

                <div className='entry-box w-fit border-4 rounded-md p-8 shadow-lg bg-neutral-50'>
                    <form onSubmit={this.handleSubmit} className='space-y-10 text-sm'>

                        <h2 className='font-bold text-center w-full text-xl tracking-wide'>Login</h2>

                        <div className='space-y-6 flex flex-col items-center'>
                            {this.renderInput('username', 'Username')}
                            {this.renderInput('password', 'Password', 'password')}
                        </div>

                        {this.renderButton('Continue', '', 'valetBtn', 'bg-transparent')}
                    </form>

                </div>
            </div>
        )
    }
}

export default Login