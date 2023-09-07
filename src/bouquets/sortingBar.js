
export default function SortingBar ({updateSorting}) {

    return (
            <div className="sortingBar">
            <button onClick={()=>updateSorting('Name')}>Name</button>
            <button onClick={()=>updateSorting('Price')}>Price</button>
            <button onClick={()=>updateSorting('$createdAt')}>Date</button>
            </div>
            );


}