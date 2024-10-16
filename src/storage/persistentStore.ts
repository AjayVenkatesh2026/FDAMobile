import {isEmpty} from 'radash';
import {MMKV} from 'react-native-mmkv';

import type {storeValueType} from 'src/types/global';

const storage = new MMKV();

const set = (key: string, value: storeValueType) => {
  try {
    storage.set(key, value);
  } catch (e) {}
};

const get = (key: string) => {
  return storage.getString(key) || storage.getNumber(key) || '';
};

const getBoolean = (key: string) => {
  return storage.getBoolean(key);
};

const deleteItem = (key: string) => {
  storage.delete(key);
};

const multiSet = (values: [string, storeValueType][]) => {
  if (!isEmpty(values)) {
    values.forEach(([key, value]) => {
      set(key, value);
    });
  }
};

const multiGet = (dataKeys: string[]) => {
  const data = [];
  if (!isEmpty(dataKeys)) {
    for (let i = 0; i < dataKeys?.length; i++) {
      const key = dataKeys[i];
      data.push([key, get(key)]);
    }
  }

  return data;
};

const multiRemove = (dataKeys: string[]) => {
  if (!isEmpty(dataKeys)) {
    for (let i = 0; i < dataKeys?.length; i++) {
      deleteItem(dataKeys[i]);
    }
  }
};

const clearAll = () => {
  if (__DEV__) {
    console.log('*****!! MMKV.clearAll()');
  }
  storage.clearAll();
};

const hasKey = (key: string) => {
  storage.contains(key);
};

export {
  set,
  get,
  getBoolean,
  multiSet,
  multiGet,
  deleteItem,
  multiRemove,
  clearAll,
  hasKey,
};
