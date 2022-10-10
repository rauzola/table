import { NewTable } from "../components/NewTable";
import React from "react";
import data from '../../Lista_de_camadas_.json';
import {IColumn } from '../components/NewTable'

interface ILayer {
    id: string;
    name?: string;
    description?: string;
    type?: string;
  }


export default function newTable() {

    const layers = data.data.layerCatalogs;
    const columns: IColumn[] = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name'
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
          }
    ];

    return(
        <>
            <NewTable<ILayer> data={layers.items} columns={columns}/>
        </>
    )
}