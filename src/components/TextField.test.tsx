import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import TextField from './TextField';

afterEach(cleanup)

test('renders field correctly', () => {
  render(<TextField label="Input" />);
  const label = screen.getByText(/Input/i);
  expect(label).toBeInTheDocument();
});

test('onChange works', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<TextField label="Input" onChange={onChange} />);
    const field = getByTestId('input')
    fireEvent.change(field, { target: { value: "ABC" } })
    expect(onChange).toBeCalled();
})
