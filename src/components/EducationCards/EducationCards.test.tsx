import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EducationCards from './index';
import formStore from '../../store/FormStore';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

jest.mock('../../store/FormStore', () => ({
  __esModule: true,
  default: {
    formRecords: [],
    addFormRecord: jest.fn(),
  },
}));

// Mock the EducationCardItem component
jest.mock('./EducationCardItem', () => {
  return function MockEducationCardItem({ institute, degree }: { institute: string; degree: string }) {
    return (
      <div data-testid="education-card-item">
        <div>{institute}</div>
        <div>{degree}</div>
      </div>
    );
  };
});

describe('testing education cards component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formStore.formRecords = [];
  });

  it('renders the education cards component with title', () => {
    render(<EducationCards />);
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('renders the Add button', () => {
    render(<EducationCards />);
    expect(screen.getByText('+ Add')).toBeInTheDocument();
  });

  it('calls add form record when add button is clicked', () => {
    render(<EducationCards />);
    const addButton = screen.getByText('+ Add');
    fireEvent.click(addButton);
    expect(formStore.addFormRecord).toHaveBeenCalledTimes(1);
  });

  it('renders education records when they exist in formStore', () => {
    formStore.formRecords = [
      {
        id: '1',
        institute: 'Test University',
        degree: 'Bachelor of Science',
        errors: {},
      },
    ];

    render(<EducationCards />);
    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
  });

  it('renders multiple education records correctly', () => {
    formStore.formRecords = [
      {
        id: '1',
        institute: 'University 1',
        degree: 'Degree 1',
        errors: {},
      },
      {
        id: '2',
        institute: 'University 2',
        degree: 'Degree 2',
        errors: {},
      },
    ];

    render(<EducationCards />);
    expect(screen.getByText('University 1')).toBeInTheDocument();
    expect(screen.getByText('University 2')).toBeInTheDocument();
    expect(screen.getByText('Degree 1')).toBeInTheDocument();
    expect(screen.getByText('Degree 2')).toBeInTheDocument();
  });

  it('renders no education records when formStore is empty', () => {
    render(<EducationCards />);
    const educationCardItems = screen.queryAllByTestId('education-card-item');
    expect(educationCardItems.length).toBe(0);
  });
});
