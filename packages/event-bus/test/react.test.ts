import { describe, test, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { EventBus, createEventBus } from '../src/index';
import {
  useEventBusListener,
  useEventBusEmitter,
  useEventBus,
} from '../src/react';

describe('React EventBus Hooks', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = createEventBus();
  });

  describe('useEventBusListener', () => {
    test('should subscribe to events', () => {
      const listener = vi.fn();

      renderHook(() => {
        useEventBusListener(eventBus, 'test-event', listener);
      });

      act(() => {
        eventBus.emit('test-event', { data: 'test' });
      });

      expect(listener).toHaveBeenCalledWith({ data: 'test' });
    });

    test('should unsubscribe on unmount', () => {
      const listener = vi.fn();

      const { unmount } = renderHook(() => {
        useEventBusListener(eventBus, 'test-event', listener);
      });

      act(() => {
        eventBus.emit('test-event', { data: 'test' });
      });

      expect(listener).toHaveBeenCalledTimes(1);

      unmount();

      act(() => {
        eventBus.emit('test-event', { data: 'test' });
      });

      expect(listener).toHaveBeenCalledTimes(1); // Не должно вызываться снова
    });

    test('should update listener when dependencies change', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const { rerender } = renderHook(
        ({ listener }) => {
          useEventBusListener(eventBus, 'test-event', listener, [listener]);
        },
        { initialProps: { listener: listener1 } },
      );

      act(() => {
        eventBus.emit('test-event', { data: 'test' });
      });

      expect(listener1).toHaveBeenCalledWith({ data: 'test' });

      rerender({ listener: listener2 });

      act(() => {
        eventBus.emit('test-event', { data: 'test2' });
      });

      expect(listener2).toHaveBeenCalledWith({ data: 'test2' });
    });
  });

  describe('useEventBusEmitter', () => {
    test('should emit events', () => {
      const listener = vi.fn();
      eventBus.on('test-event', listener);

      const { result } = renderHook(() => useEventBusEmitter(eventBus));

      act(() => {
        result.current('test-event', { data: 'test' });
      });

      expect(listener).toHaveBeenCalledWith({ data: 'test' });
    });

    test('should maintain stable emit function', () => {
      const { result, rerender } = renderHook(() =>
        useEventBusEmitter(eventBus),
      );

      const emit1 = result.current;
      rerender();
      const emit2 = result.current;

      expect(emit1).toBe(emit2);
    });
  });

  describe('useEventBus', () => {
    test('should provide all EventBus methods', () => {
      const { result } = renderHook(() => useEventBus(eventBus));

      expect(typeof result.current.emit).toBe('function');
      expect(typeof result.current.on).toBe('function');
      expect(typeof result.current.off).toBe('function');
      expect(typeof result.current.removeAllListeners).toBe('function');
      expect(typeof result.current.getListenerCount).toBe('function');
      expect(typeof result.current.hasListeners).toBe('function');
      expect(typeof result.current.getEventNames).toBe('function');
    });

    test('should emit events', () => {
      const listener = vi.fn();
      eventBus.on('test-event', listener);

      const { result } = renderHook(() => useEventBus(eventBus));

      act(() => {
        result.current.emit('test-event', { data: 'test' });
      });

      expect(listener).toHaveBeenCalledWith({ data: 'test' });
    });

    test('should check listeners', () => {
      const { result } = renderHook(() => useEventBus(eventBus));

      expect(result.current.hasListeners('test-event')).toBe(false);

      act(() => {
        eventBus.on('test-event', vi.fn());
      });

      expect(result.current.hasListeners('test-event')).toBe(true);
      expect(result.current.getListenerCount('test-event')).toBe(1);
    });
  });
});
