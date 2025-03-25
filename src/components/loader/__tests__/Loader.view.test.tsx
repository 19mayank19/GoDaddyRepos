import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loader from '../Loader.view';

describe('Loader Component', () => {
    it('should render loader container with appropriate styles', () => {
      render(<Loader />);
  
      const loaderContainer = screen.getByText('Please wait, your app is loading...');
      
      expect(loaderContainer).toBeInTheDocument();
      expect(loaderContainer.closest('div')).toHaveClass('loaderContainer');
    });
  });