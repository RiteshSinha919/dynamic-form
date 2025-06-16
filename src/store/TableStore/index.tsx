import { makeObservable, runInAction } from "mobx";

export interface TableRowItem {
  id: string;
  name: string;
  bank_details: string[];
  time_stamp: string;
  payment_type: "credit" | "debit";
}

class TableStore {
  data: TableRowItem[] = [];
  currentPage = 1;
  pageSize = 10;
  loading = false;

  constructor() {
    makeObservable(this);
  }

  async fetchData() {
    if (this.loading) return;
    this.loading = true;

    try {
      const response = await fetch(
        `/api/items?page=${this.currentPage}&limit=${this.pageSize}`
      );
      const result = await response.json();
      runInAction(() => {
        this.data = [...this.data, ...result.data];
        this.currentPage += 1;
      });
    } catch (error) {
      console.error("failed to get the table data", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  resetData() {
    this.data = [];
    this.currentPage = 1;
  }
}

export const tableStore = new TableStore();
