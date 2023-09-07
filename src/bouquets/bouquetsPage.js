import { useState } from "react";
import BouquetList from "./bouquetList";
import SortingBar from "./sortingBar";


export default function BouquetsPage() {

    const [sorting, setSorting] =  useState({ field: 'Name',
                                              direction: 'asc'
                                            });


    function toggleDirection(direction) {
        return direction === 'asc' ? 'desc' : 'asc';
    }

    
    function updateSorting(field) {
        const direction = sorting.field !== field ? 'asc' : toggleDirection(sorting.direction);
        setSorting({ field: field,
                    direction: direction,
                    });
    }

    return (
        <>
        <SortingBar updateSorting={updateSorting}/>
        <BouquetList sorting={sorting}/>
        </>
    )
}