import { contain, getIndexDoorMain } from '@shared/utils/functions';

interface Door {
  id: number;
  [key: string]: any;
}

describe('contain', () => {
  it('should return true if all items in the array match the condition', () => {
    const arr: Door[] = [
      { id: 1, key1: true, main: true },
      { id: 2, key1: true, main: false },
      { id: 3, key1: true, main: false },
    ];

    const result = contain(arr, 'key1', true);

    expect(result).toBeTrue();
  });

  it('should return false if any item in the array does not match the condition', () => {
    const arr: Door[] = [
      { id: 1, key1: true, main: true },
      { id: 2, key1: false, main: false },
      { id: 3, key1: true, main: false },
    ];

    const result = contain(arr, 'key1', true);

    expect(result).toBeFalse();
  });

  it('should handle an empty array and return false', () => {
    const arr: Door[] = [];

    const result = contain(arr, 'key1', true);

    expect(result).toBeTrue();
  });

  it('should handle an array with a single item matching the condition', () => {
    const arr: Door[] = [{ id: 1, key1: true, main: false }];

    const result = contain(arr, 'key1', true);

    expect(result).toBeTrue();
  });

  it('should handle an array with a single item not matching the condition', () => {
    const arr: Door[] = [{ id: 1, key1: false, main: false }];

    const result = contain(arr, 'key1', true);

    expect(result).toBeTrue();
  });
});

describe('getIndexDoorMain', () => {
  it('should return the index of the door with main equal to true', () => {
    const doors: Door[] = [
      { id: 1, main: false },
      { id: 2, main: true },
      { id: 3, main: false },
    ];

    const result = getIndexDoorMain(doors);

    expect(result).toEqual(1);
  });

  it('should return -1 if there is no door with main equal to true', () => {
    const doors: Door[] = [
      { id: 1, main: false },
      { id: 2, main: false },
      { id: 3, main: false },
    ];

    const result = getIndexDoorMain(doors);

    expect(result).toEqual(-1);
  });

  it('should return the first index of the door with main equal to true if there are multiple', () => {
    const doors: Door[] = [
      { id: 1, main: true },
      { id: 2, main: true },
      { id: 3, main: false },
    ];

    const result = getIndexDoorMain(doors);

    expect(result).toEqual(0);
  });

  it('should return -1 for an empty array', () => {
    const doors: Door[] = [];

    const result = getIndexDoorMain(doors);

    expect(result).toEqual(-1);
  });
});