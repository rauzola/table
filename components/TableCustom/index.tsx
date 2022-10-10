import { Table } from "antd";
import React, { ReactNode } from "react";

interface TableProps {
  newArray: NewDataType;
  mergeColumns: NewDataType;
  ResizableTitle:string;
}

interface NewDataType {
  id?: string;
  name?: string;
  code?: string;
  countryName?: string;
}

export default function TableCustomizer({ newArray, mergeColumns, ResizableTitle }: TableProps) {
  return (
    <>
      <h1>aaaas</h1>
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