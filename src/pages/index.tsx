import "antd/dist/antd.css";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import React, { useState } from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import data1 from '../../json_teste.json';
import TableCostumize from "../components/TableCostumize";
import ColunsTable from "../components/ColunsTable";


interface NewDataType {
  id: string;
  name?: string;
  code?: string;
  countryName?: string;
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
      {/* <Resizable
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
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable> */}
    </>
  );
};

const { data } = data1;
const { myDatasets } = data;

let newArray: NewDataType[] = [];
myDatasets.items.forEach(function (item) {

  let name;
  let code;
  let description;
  let countryName;
  let translatiosCode;
  // debugger;
  if (item.translations && item.translations.length > 0) {
    name = item.translations[0].name;
    description = item.translations[0].description;
    code = item.translations[0].code;
  }

  if (item.country
    && item.country.translations
    && item.country.translations.length > 0) {
    countryName = item.country.translations[0].name;
    translatiosCode = item.country.translations[0].code;
  }

  const newItem = {
    id: item.id,
    name: name,
    code: code,
    description: description,
    countryName: countryName,
    translatiosCode: translatiosCode
  }

  newArray.push(newItem);

});

// console.log(newArray);

// var items = myDatasets.items
// for (let caracteristica in items){
//     //exibe as propriedades do objeto items
//     console.log(items[caracteristica]);
// }



// for( const item in myDatasets.items ) {
//    const dataset = { 'id': item.code, 'name': item.name }
//    console.log(dataset);
//   // newArray.push( )
// }


export default function App() {
  const [columns, setColumns] = useState<ColumnsType<NewDataType>>([
    {
      title: 'Id',
      dataIndex: 'id',
      width: 250,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'description',
      dataIndex: ['description'],
      width: 250,
    },
    {
      title: 'code',
      dataIndex: 'code',
      width: 250,
    },
    {
      title: 'País',
      dataIndex: ['countryName'],
      width: 250,
    },
    {
      title: 'Code',
      dataIndex: ['translatiosCode'],
      width: 250,
    }
  ]);



  const handleResize =
    (index: number) =>
      (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
        const newColumns = [...columns];
        newColumns[index] = {
          ...newColumns[index],
          width: size.width,
        };
        setColumns(newColumns);
      };

  const mergeColumns: ColumnsType<NewDataType> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: (column as ColumnType<NewDataType>).width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <>
      <TableCostumize
        newArray={newArray}
        mergeColumns={mergeColumns}
        ResizableTitle={ResizableTitle}
      />
      {/* <Table
        rowKey={'id'}
        bordered
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={mergeColumns}
        dataSource={newArray}
      /> */}
    </>
  );
};
