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
    // let newArray: ILayer[] = [];

    const newArray = layers?.items?.map(({ ...item }) => ({
        ...item,
        views: item.views.join(', ')
      }));


    // layers.items.forEach(function (item) {
    //     // console.log(item)
    //     let views = item.views.join(', ');

    //     let count = 0;
    //     item.views.map(function (view) {
    //         views = views.concat(view);
    //         count++;

    //         if (count + 1) < item.views.length) {
    //             //         views += ', ';
    //             //     }
    //         }

    //         // for (let key in item.views) {
    //         //     debugger;
    //         //     console.log(key);
    //         //     views += item.views[key];

    //         //     // console.log(key)
    //         //     if ((parseInt(key) + 1) < item.views.length) {
    //         //         views += ', ';
    //         //     }
    //         // }


    //         const newItem = {
    //             id: item.id,
    //             name: item.name,
    //             description: item.description,
    //             type: item.type,
    //             views: views
    //         }
    //         // console.log(newItem);
    //         newArray.push(newItem);

    //     });








        // console.log(layers.items[0].views.join());
        // let newColumns = [...layers.items];
        // newColumns = {
        //     ...newColumns,
        // };




        // let viewsa = [views, ...layers.items];
        // console.log(viewsa);

        // layers.items = [...layers.items]

        // layers.items.push(newItem)

        // let id;
        // let name;
        // let description;
        // let type;
        // let asd;


        // const newItem = {
        //     id: layers.items[0].id,
        //     name: layers.items[0].name,
        //     description: layers.items[0].description,
        //     type: layers.items[0].type,
        //     viewsa: viewsa
        // }

        // console.log(snewItem)
        //   newArray.push(newItem);

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
                    data={newArray}
                    columns={columns}
                    isResizable={true}
                />
            </>
        )
    }