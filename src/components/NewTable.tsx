import { Table } from "antd";
import React from "react";
import "antd/dist/antd.css";

type TableProps<T> = {
    data: T[] | any;
    columns: Array<IColumn>;

}


export type IColumn = {
    title: string;
    dataIndex: string | string[];
    key: string;
}



export const NewTable = <T extends unknown>
    ({ data, columns }: TableProps<T>)  => {
        
    return (
        <>
            <Table
                rowKey={'id'}
                bordered
                columns={columns}
                dataSource={data}
            />
        </>
    )
}