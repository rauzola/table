import { NewTable } from "../components/NewTable";
import React from "react";
import data from '../../json_teste.json';
import {IColumn } from '../components/NewTable'

interface IDataset {
    id: string;
    name?: string;
    country: {
        name: string;
    }
    //  views?: string[];
  }


export default function home() {

    const datasets = data.data.myDatasets;
    const columns: IColumn[] = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name'
        },
        {
            title: 'País',
            dataIndex: ['country', 'name'],
            key: 'description'
          }
    ];

    return(
        <>
            <NewTable<IDataset> data={datasets.items} columns={columns}/>
        </>
    )
}