import { NewTable } from "../components/NewTable";
import React from "react";
import data from '../../Lista_de_camadas_.json';
import { IColumn } from '../components/NewTable'
import ColunsTable from "../components/ColunsTable";
import { ResizeCallbackData } from "react-resizable";

interface ILayer {
    id: string;
    name?: string;
    description?: string;
    type?: string;
    view?: string;
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
            <ColunsTable
                width={width}
                height={0}
                onResize={onResize}
                {...restProps}
            />
        </>
    );
};



export default function newTable() {


    const layers = data.data.layerCatalogs;
    // console.log(layer.items[0].views.join());

    // const newColumns = [...layer.items];
    // newColumns[index] = {
    //     ...newColumns[index],
    // };


    
    let views = "";

    for (let key in layers.items[0].views) {
        views += layers.items[0].views[key];

        console.log(key)
        if ((parseInt(key) + 1) < layers.items[0].views.length) {
            views += ', ';
        }
    }

        console.log(views);

        // const myArr = layers.items[0].views;

        // const myArrStr = JSON.stringify(myArr);

        // console.log(myArrStr);

        // var objeto = JSON.parse(myArrStr);

        // console.log(objeto);



        const columns: IColumn[] = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: 250,

            },
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name',
                width: 250,

            },
            {
                title: 'Descrição',
                dataIndex: 'description',
                key: 'description',
                width: 250,

            },
            {
                title: 'type',
                dataIndex: 'type',
                key: 'type',
                width: 250,

            },
            {
                title: 'views',
                dataIndex: 'views',
                key: 'views',
                width: 250,

            }
        ];

        return (
            <>
                <NewTable<ILayer>
                    data={layers.items}
                    columns={columns}
                    isResizable={true}

                />
            </>
        )
    }