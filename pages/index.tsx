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
  // const test = myDatasets.items[0].translations[0];
  // console.log(test.code)
  // var asd = test.code

  // const columns = Object.keys(a[0]||{})
  //   .map(key => ({dataIndex: key, key, title: key}));

  const {items} = myDatasets
  console.log(items)

//   for (var i = 0, l = items.length; i < l; i++) {
//     var obj = items[i];
//     console.log(obj)
//     // ...
// }


  let newArray;
  myDatasets.items.forEach(function(item){
    
    // debugger;
    const newItem = {
      id: item.id,
      name: item.name,
    }

    

    if (item.translations && item.translations.length > 0) {
      console.log(item.translations[0].code);
    }
});

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
  const [columns, setColumns] = useState<ColumnsType<DataType>>([
    {
      title: 'Nome',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 100,
    },
    {
      title: 'País',
      dataIndex: ['country', 'name'],
      width: 100,
    },
    // {
    //   title: 'code',
    //   dataIndex: asd,
    //   width: 100,
    // }
    
    
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

  const mergeColumns: ColumnsType<DataType> = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: (column as ColumnType<DataType>).width,
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
      dataSource={myDatasets?.items}
    />
  );
};

export default App;