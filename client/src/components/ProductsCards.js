import React, {Component} from "react"
import ProductCard from "./ProductCard";


export default class ProductsCards extends Component
{

    render()
    {
        return (
            <div>
                {this.props.product.map((product) => <ProductCard leRow key={product._id} product={product}/>)}
            </div>

        )
    }
}