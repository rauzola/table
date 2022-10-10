import { Resizable, ResizeCallbackData } from "react-resizable";
import React from "react";

interface TableProps {
    width: React.SyntheticEvent<Element>, data: ResizeCallbackData;
    height: boolean;
    onResize: NewDataType;
    
}

interface NewDataType {
    id: string;
    name?: string;
    code?: string;
    countryName?: string;
    description?: string[];
    type?: string;
}

export default function ColunsTable({ width, height, onResize, ...restProps }: TableProps) {
    return (
        <>
            <Resizable
                width={width}
                height={height}
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
    )
}