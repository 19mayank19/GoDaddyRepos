import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './RepoDetails.module.scss';

const RepoDetails: React.FC = () => {

    const location = useLocation();
    const navigate =  useNavigate();

    const { name, description, url, language, watchers, forks_count, open_issues_count } = location.state || {};

    return (
        <>
            <div className={styles.repoDetailsContainer}>
                <p className={styles.header}>Name</p>
                <p className={styles.description}>{name || `--Not Available--`}</p>
                <p className={styles.header}>Description</p>
                <p className={styles.description}>{description || `--Not Available--`}</p>
                <p className={styles.header}>Url</p>
                <p className={styles.description}>{url  || `--Not Available--`}</p>
                <p className={styles.header}>Language</p>
                <p className={styles.description}>{language  || `--Not Available--`}</p>
                <p className={styles.header}>Watchers</p>
                <p className={styles.description}>{watchers  || `--Not Available--`}</p>
                <p className={styles.header}>Fork Count</p>
                <p className={styles.description}>{forks_count  || `--Not Available--`}</p>
                <p className={styles.header}>Open Issues Count</p>
                <p className={styles.description}>{open_issues_count  || `--Not Available--`}</p>
            </div>
            <button onClick={() => navigate(-1)} className={styles.btn}>Go Back</button>
        </>
    )
}

export default RepoDetails;