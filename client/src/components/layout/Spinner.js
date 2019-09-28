import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
    <Fragment>
        <img
            src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/source.gif'
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
);
