import { renderHook, act } from '@testing-library/react-native';
import useDebounce from './debounceUtils';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current).toBe('initial');

    // Change the value
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated'); // Should now be updated
  });

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // Change value multiple times rapidly
    rerender({ value: 'first', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'second', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'final', delay: 500 });
    
    // Should still be initial after 400ms total
    expect(result.current).toBe('initial');

    // Complete the debounce period
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('final');
  });
});