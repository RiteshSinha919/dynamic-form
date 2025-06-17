import styled from "styled-components";


export const TableWrapper = styled.div`
  margin: 20px 0;
  height: 200px;
  overflow-y: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
`;

export const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

export const LoadingText = styled.p`
  text-align: center;
`;