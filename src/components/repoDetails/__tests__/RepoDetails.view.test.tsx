import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';

import RepoDetails from '../RepoDetails.view';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('RepoDetails Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    it('should display repo details correctly when data is available', () => {
        (useLocation as jest.Mock).mockReturnValue({
            state: {
              name: 'Test Repo',
              description: 'This is a test repo',
              url: 'https://github.com/test-repo',
              language: 'JavaScript',
              watchers: 10,
              forks_count: 5,
              open_issues_count: 2,
            },
        });

        render(
            <MemoryRouter>
              <RepoDetails />
            </MemoryRouter>
        );
        
        expect(screen.getByText('Test Repo')).toBeInTheDocument();
        expect(screen.getByText('This is a test repo')).toBeInTheDocument();
        expect(screen.getByText('https://github.com/test-repo')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should display placeholder text when data is not available', () => {
        (useLocation as jest.Mock).mockReturnValue({ state: {} });
    
        render(
          <MemoryRouter>
            <RepoDetails />
          </MemoryRouter>
        );
    
        expect(screen.getAllByText('--Not Available--').length).toBe(7);
    });

    it('should navigate back when the Go Back button is clicked', () => {
        (useLocation as jest.Mock).mockReturnValue({ state: {} });
    
        render(
          <MemoryRouter>
            <RepoDetails />
          </MemoryRouter>
        );
    
        const button = screen.getByText('Go Back');
        button.click();
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
})