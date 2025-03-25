import { renderHook, act } from '@testing-library/react';

import useRepoList from '../useRepoList';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useRepoList Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should fetch and set repoList when no cached data is available', async () => {
    const mockData = [{ id: 1, name: 'Repo 1' }];
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const { result } = renderHook(() => useRepoList());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.repoList).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(localStorage.getItem('repoList')).toBeTruthy();
  });

  it('should load data from cache if valid and skip fetch', async () => {
    const mockData = [{ id: 1, name: 'Repo 1' }];
    const timestamp = Date.now();
    localStorage.setItem('repoList', JSON.stringify({ data: mockData, timestamp }));

    const { result } = renderHook(() => useRepoList());

    expect(result.current.repoList).toEqual(mockData);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should fetch data if cache is expired', async () => {
    const mockData = [{ id: 1, name: 'Repo 1' }];
    const expiredTimestamp = Date.now() - 11 * 60 * 1000; // 11 minutes ago
    localStorage.setItem('repoList', JSON.stringify({ data: mockData, timestamp: expiredTimestamp }));

    const newMockData = [{ id: 2, name: 'Repo 2' }];
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(newMockData),
    });

    const { result } = renderHook(() => useRepoList());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.repoList).toEqual(newMockData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useRepoList());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.repoList).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
