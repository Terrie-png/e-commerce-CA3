import React, {Component} from "react"
import ProductCard from "./ProductCard";


export default class ProductsCards extends Component
{

    render()
    {
        return (
            <div class="cards">
                {this.props.product.map((product) => <ProductCard leRow key={product._id} product={product}/>)}
            </div>

        )
    }
}