import { action, makeObservable, observable, runInAction } from "mobx";
import { TableRowItem } from "../models/TableRowItem";

class TableStore {
  data: TableRowItem[] = [];
  currentPage = 1;
  pageSize = 10;
  loading = false;
  totalItems = 0;
  hasMore = true;

  constructor() {
    makeObservable(this, {
      data: observable,
      currentPage: observable,
      pageSize: observable,
      loading: observable,
      totalItems: observable,
      hasMore: observable,
      fetchData: action,
      resetData: action,
    });
  }

  fetchData = async () => {
    if (this.loading || !this.hasMore) return;
    this.loading = true;

    try {
      const response = await fetch(
        `/api/items?page=${this.currentPage}&limit=${this.pageSize}`
      );
      const result = await response.json();
      runInAction(() => {
        this.data = [...this.data, ...result.data];
        this.totalItems = result.total;
        this.currentPage += 1;
        this.hasMore = this.data.length < this.totalItems;
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
    this.totalItems = 0;
    this.hasMore = true;
  }
}

export const tableStore = new TableStore();
