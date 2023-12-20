import React from 'react';
import css from './loading.module.css'

const Loading = () => {
    return (
        <div className={css.loadingContainer}>
      <div className={css.loader}></div>
      <p>Loading...</p>
    </div>
    );
};

export default Loading;
