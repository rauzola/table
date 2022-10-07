import "antd/dist/antd.css";
import { Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import React, { useState } from 'react';
import type { ResizeCallbackData } from 'react-resizable';
import { Resizable } from 'react-resizable';
import data1 from '../json_teste.json';

interface DataType {
  id: string;
  name: string;
  description?: string;
  country?: string;
  code?: string;
}

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
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

  const {data} = data1;
  const {myDatasets} = data;

  let newArray: NewDataType[] = [];
  myDatasets.items.forEach(function(item){
    
    let name;
    let code;
    let description;
    let countryName;
    // debugger;
    if (item.translations && item.translations.length > 0) {
      name = item.translations[0].name;
      code = item.translations[0].code;
      description = item.translations[0].description;
    }

    if (item.country 
      && item.country.translations 
      && item.country.translations.length > 0) {
        countryName = item.country.translations[0].name;
      }

    const newItem = {
      id: item.id,
      name: name,
      code: code,
      description: description,
      countryName: countryName
    }

    newArray.push(newItem);
    
});

console.log(newArray);

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


const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnsType<NewDataType>>([
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
  );
};

export default App;