import React, {Component} from "react"
import ProductsTableRow from "./ProductsTableRow"


export default class ProductsTable extends Component
{

    render()
    {
        return (
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>brand</th>
                    <th>gender</th>
                    <th>category</th>
                    <th>price</th>
                    <th>is_in_inventory</th>
                    <th>items_lef</th>
                    <th>slug</th>
                    <th> </th>
                </tr>
                </thead>

                <tbody>
                {this.props.carts.map((product) => {
                    if(product == null){
                       console.log("null")
                    } else{
                        return <ProductsTableRow key={product._id} product={product}/>
                }})}
                </tbody>
            </table>
        )
    }
}