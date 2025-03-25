import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import RepoList from '../RepoList.view';
import useRepoList from '../useRepoList';

jest.mock('../useRepoList');
jest.mock('../../loader/Loader.view', () => () => <div>Loading...</div>);

describe('RepoList Component', () => {
  it('should display loader when loading is true', () => {
    (useRepoList as jest.Mock).mockReturnValue({ isLoading: true, repoList: [] });

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display the list of repositories when loading is false', () => {
    const mockRepos = [
      { id: 1, name: 'Repo 1', description: 'Description 1' },
      { id: 2, name: 'Repo 2', description: 'Description 2' },
    ];
    (useRepoList as jest.Mock).mockReturnValue({ isLoading: false, repoList: mockRepos });

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText('GoDaddy Repositories')).toBeInTheDocument();
    mockRepos.forEach(repo => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.description)).toBeInTheDocument();
      expect(screen.getByLabelText(`View details for ${repo.name}`)).toBeInTheDocument();
    });
  });

  it('should show no repositories message when repoList is empty', () => {
    (useRepoList as jest.Mock).mockReturnValue({ isLoading: false, repoList: [] });

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText('GoDaddy Repositories')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
