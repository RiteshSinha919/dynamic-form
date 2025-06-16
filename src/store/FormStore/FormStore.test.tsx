import {  act } from '@testing-library/react';
import formStore from './index';

describe('FormStore', () => {
  beforeEach(() => {
    formStore.formRecords = [];
    formStore.addFormRecord();
  });

  describe('add form record', () => {
    it('should add a new form record with empty values', () => {
      const initialLength = formStore.formRecords.length;
      act(() => {
        formStore.addFormRecord();
      });
      expect(formStore.formRecords.length).toBe(initialLength + 1);
      const newRecord = formStore.formRecords[formStore.formRecords.length - 1];
      expect(newRecord.institute).toBe('');
      expect(newRecord.degree).toBe('');
      expect(newRecord.errors).toEqual({});
      expect(newRecord.id).toBeDefined();
    });
  });

  describe('updateFormRecord', () => {
    it('should update the specified field of a form record', () => {
      const recordId = formStore.formRecords[0].id;
      act(() => {
        formStore.updateFormRecord(recordId, 'institute', 'Test University');
      });
      const updatedRecord = formStore.formRecords.find(record => record.id === recordId);
      expect(updatedRecord?.institute).toBe('Test University');
    });

    it('should not update if record id is not found', () => {
      const initialRecord = { ...formStore.formRecords[0] };
      act(() => {
        formStore.updateFormRecord('non-existent-id', 'institute', 'Test University');
      });
      const record = formStore.formRecords.find(record => record.id === initialRecord.id);
      expect(record).toEqual(initialRecord);
    });
  });

  describe('removeFormRecord', () => {
    it('should remove the specified form record', () => {
      const initialLength = formStore.formRecords.length;
      const recordId = formStore.formRecords[0].id;
      act(() => {
        formStore.removeFormRecord(recordId);
      });
      expect(formStore.formRecords.length).toBe(initialLength - 1);
      expect(formStore.formRecords.find(record => record.id === recordId)).toBeUndefined();
    });

    it('should not remove any record if id is not found', () => {
      const initialLength = formStore.formRecords.length;
      act(() => {
        formStore.removeFormRecord('non-existent-id');
      });
      expect(formStore.formRecords.length).toBe(initialLength);
    });
  });

  describe('validateFormRecord', () => {
    it('should add error when field is empty', () => {
      const recordId = formStore.formRecords[0].id;
      act(() => {
        formStore.updateFormRecord(recordId, 'institute', '');
      });
      const record = formStore.formRecords.find(record => record.id === recordId);
      expect(record?.errors.institute).toBe('institute is required');
    });

    it('should remove error when field has value', () => {
      const recordId = formStore.formRecords[0].id;
      act(() => {
        formStore.updateFormRecord(recordId, 'institute', '');
        formStore.updateFormRecord(recordId, 'institute', 'Test University');
      });
      const record = formStore.formRecords.find(record => record.id === recordId);
      expect(record?.errors.institute).toBeUndefined();
    });
  });
});
