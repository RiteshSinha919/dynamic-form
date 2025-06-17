import React from "react";
import { Table } from "../../components/Table";

import { StyledTableContainer } from "./styledComponents";
import { observer } from "mobx-react-lite";

const TableRoute: React.FC = observer(() => {
  return (
    <StyledTableContainer>
      <Table />
    </StyledTableContainer>
  );
});

export default TableRoute;
