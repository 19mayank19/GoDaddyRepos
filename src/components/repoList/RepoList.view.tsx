import React from 'react';
import { Link } from 'react-router-dom';

import useRepoList from './useRepoList';
import styles from './RepoList.module.scss';
import { IRepo } from './RepoList.types';
import Loader from '../loader/Loader.view';

const RepoList: React.FC = () => {

    const { repoList, isLoading } = useRepoList();

    return (
        <div>
            {
                isLoading ? (<Loader />) : (
                    <>
                        <h1>GoDaddy Repositories</h1>
                        {repoList.map((repo: IRepo) => (
                            <div key={repo.id} className={styles.repoContainer}>
                                <p className={styles.name}>{repo.name}</p>
                                <p className={styles.description}>{repo.description}</p>
                                <Link to={`/${repo.id}`} state={repo} aria-label={`View details for ${repo.name}`}>Know More</Link>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default RepoList;