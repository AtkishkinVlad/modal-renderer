import { describe, test, expect, beforeEach, vi } from 'vitest';
import { EventBus, createEventBus } from '../src/index';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = createEventBus();
  });

  test('should create new instance', () => {
    expect(eventBus).toBeInstanceOf(EventBus);
  });

  test('should subscribe to events', () => {
    const listener = vi.fn();
    const unsubscribe = eventBus.on('test-event', listener);

    expect(typeof unsubscribe).toBe('function');
    expect(eventBus.getListenerCount('test-event')).toBe(1);
  });

  test('should emit events to listeners', () => {
    const listener = vi.fn();
    eventBus.on('test-event', listener);

    eventBus.emit('test-event', { data: 'test' });

    expect(listener).toHaveBeenCalledWith({ data: 'test' });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should handle multiple listeners', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventBus.on('test-event', listener1);
    eventBus.on('test-event', listener2);

    eventBus.emit('test-event', { data: 'test' });

    expect(listener1).toHaveBeenCalledWith({ data: 'test' });
    expect(listener2).toHaveBeenCalledWith({ data: 'test' });
    expect(eventBus.getListenerCount('test-event')).toBe(2);
  });

  test('should unsubscribe from events', () => {
    const listener = vi.fn();
    const unsubscribe = eventBus.on('test-event', listener);

    eventBus.emit('test-event', { data: 'test' });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    eventBus.emit('test-event', { data: 'test' });
    expect(listener).toHaveBeenCalledTimes(1); // Не должно вызываться снова
    expect(eventBus.getListenerCount('test-event')).toBe(0);
  });

  test('should remove specific listener', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventBus.on('test-event', listener1);
    eventBus.on('test-event', listener2);

    eventBus.off('test-event', listener1);

    eventBus.emit('test-event', { data: 'test' });

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).toHaveBeenCalledWith({ data: 'test' });
    expect(eventBus.getListenerCount('test-event')).toBe(1);
  });

  test('should remove all listeners for specific event', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventBus.on('test-event', listener1);
    eventBus.on('test-event', listener2);

    eventBus.removeAllListeners('test-event');

    eventBus.emit('test-event', { data: 'test' });

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
    expect(eventBus.getListenerCount('test-event')).toBe(0);
  });

  test('should remove all listeners', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    eventBus.on('event1', listener1);
    eventBus.on('event2', listener2);

    eventBus.removeAllListeners();

    eventBus.emit('event1', { data: 'test' });
    eventBus.emit('event2', { data: 'test' });

    expect(listener1).not.toHaveBeenCalled();
    expect(listener2).not.toHaveBeenCalled();
    expect(eventBus.getEventNames()).toEqual([]);
  });

  test('should check if has listeners', () => {
    expect(eventBus.hasListeners('test-event')).toBe(false);

    eventBus.on('test-event', vi.fn());

    expect(eventBus.hasListeners('test-event')).toBe(true);
  });

  test('should get event names', () => {
    eventBus.on('event1', vi.fn());
    eventBus.on('event2', vi.fn());

    const eventNames = eventBus.getEventNames();
    expect(eventNames).toContain('event1');
    expect(eventNames).toContain('event2');
    expect(eventNames).toHaveLength(2);
  });

  test('should handle events with different types', () => {
    const stringListener = vi.fn();
    const numberListener = vi.fn();
    const objectListener = vi.fn();

    eventBus.on('string-event', stringListener);
    eventBus.on('number-event', numberListener);
    eventBus.on('object-event', objectListener);

    eventBus.emit('string-event', 'hello');
    eventBus.emit('number-event', 42);
    eventBus.emit('object-event', { key: 'value' });

    expect(stringListener).toHaveBeenCalledWith('hello');
    expect(numberListener).toHaveBeenCalledWith(42);
    expect(objectListener).toHaveBeenCalledWith({ key: 'value' });
  });

  test('should not emit to non-existent events', () => {
    const listener = vi.fn();
    eventBus.on('existing-event', listener);

    eventBus.emit('non-existing-event', { data: 'test' });

    expect(listener).not.toHaveBeenCalled();
  });
});
