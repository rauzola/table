import { Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import React from "react";

interface TableProps {
  newArray: NewDataType[];
  mergeColumns: ColumnsType<NewDataType>;
  ResizableTitle: React.HTMLAttributes<any>;
}

interface NewDataType {
  id: string;
  name?: string;
  code?: string;
  countryName?: string;
  description?: string[];
  type?: string;
}

export default function TableCostumize
  ({ newArray, mergeColumns, ResizableTitle }: TableProps) {
  return (
    <>
      <Table
        rowKey={'id'}
        bordered
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        dataSource={newArray}
      />
    </>
  )
}