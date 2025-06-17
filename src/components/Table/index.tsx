// components/DataTable.tsx
import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { tableStore } from "../../store/TableStore";
import TableItem from "./TableItem";
import {
  TableWrapper,
  StyledTable,
  TableHeader,
  LoadingText,
} from "./styledComponents";
import { TableRowItem } from "../../store/models/TableRowItem";

export const Table = observer(() => {
  const { data, loading, fetchData } = tableStore;
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          fetchData();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (observerRef.current) {
      intersectionObserver.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        intersectionObserver.unobserve(observerRef.current);
      }
    };
  }, [loading]);

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Bank Details</TableHeader>
            <TableHeader>Timestamp</TableHeader>
            <TableHeader>Payment Type</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((item: TableRowItem) => (
            <TableItem key={item.id} {...item} />
          ))}
        </tbody>
      </StyledTable>

      {loading && <LoadingText>Loading...</LoadingText>}

      <div ref={observerRef} style={{ height: "20px" }} />
    </TableWrapper>
  );
});
