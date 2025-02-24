import '@testing-library/jest-dom';

describe('Simple Test', () => {
  it('should use toBeInTheDocument matcher', () => {
    document.body.innerHTML = `<div>Hello, world!</div>`;
    const element = document.querySelector('div');
    expect(element).toBeInTheDocument();
  });

  it('should use toHaveAttribute matcher', () => {
    document.body.innerHTML = `<img src="test.png" alt="Test Image" />`;
    const img = document.querySelector('img');
    expect(img).toHaveAttribute('src', 'test.png');
  });
});