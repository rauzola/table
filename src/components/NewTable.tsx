import { Table } from "antd";
import React, { useState } from "react";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import "antd/dist/antd.css";
import { Resizable, ResizeCallbackData } from "react-resizable";

type TableProps<T> = {
    data: T[] | any;
    columns: ColumnsType<IColumn>;
    isResizable: boolean;
}


export type IColumn = {
    title: string;
    dataIndex: string | string[];
    key: string;
    width?: number;
}

const ResizableTitle = (
    props: React.HTMLAttributes<any> & {
        onResize: (e: React.SyntheticEvent<Element>, data: ResizeCallbackData) => void;
        width: number;
    },
) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <>
            <Resizable
                width={width}
                height={0}
                handle={
                    <span
                        className="react-resizable-handle"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    />
                }
                onResize={onResize}
            >
                <th {...restProps} />
            </Resizable>
        </>
    );
};


export const NewTable = <T extends unknown>
    ({ data, columns, isResizable }: TableProps<T>) => {


    const [newColumns, setNewColumns] = useState<ColumnsType<IColumn>>([...columns]);

    if (isResizable) {
        const handleResize =
            (index: number) =>
                (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
                    const newColumns = [...columns];
                    newColumns[index] = {
                        ...newColumns[index],
                        width: size.width,
                    };
                    setNewColumns(newColumns);
                };

        const resizeColumns: ColumnsType<IColumn> = newColumns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: (column as ColumnType<IColumn>).width,
                onResize: handleResize(index),
            }),
        }));

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
                    columns={resizeColumns}
                    dataSource={data}
                />
            </>
        )
    }
    else {
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


}