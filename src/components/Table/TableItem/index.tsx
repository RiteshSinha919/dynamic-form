import React from "react";
import { TableRowItem } from "../../../store/models/TableRowItem";

const TableItem: React.FC<TableRowItem> = ({
  id,
  name,
  payment_type,
  bank_details,
  time_stamp,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{bank_details.join(", ")}</td>
      <td>{time_stamp}</td>
      <td>{payment_type}</td>
    </tr>
  );
};

export default TableItem;
