import { useEffect, useState } from "react";
import { IRepo } from "./RepoList.types";

const useRepoList = () => {

    const [repoList, setRepoList] = useState<Array<IRepo>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const CACHE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

    const fetchRepoList = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://api.github.com/orgs/godaddy/repos');
            const data = await response.json();
            setRepoList(data);
            localStorage.setItem('repoList', JSON.stringify({ data, timestamp: Date.now() }));
        } catch (error) {
            console.error('Error in fetching repos: ', error);
        };
        setIsLoading(false);
    }

    useEffect(() => {

        const cachedData = localStorage.getItem('repoList');

        if (cachedData) {
            try {
                const { data, timestamp } = JSON.parse(cachedData);
                const isCacheValid = Date.now() - timestamp < CACHE_EXPIRATION_TIME;
          
                if (isCacheValid) {
                  setRepoList(data);
                } else {
                  fetchRepoList();
                }
              } catch (error) {
                console.error('Failed to parse cached data, fetching new data', error);
                fetchRepoList();
              }
        } else {
            fetchRepoList();
        }
    }, []);

    return {
        repoList,
        isLoading
    }
}

export default useRepoList;