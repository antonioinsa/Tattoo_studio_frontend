import React, { useState, useEffect } from 'react';
import { allProducts } from '../../services/apiCalls';
import "./Products.css"
import { LoaderBar } from '../../common/Loader/Loader';
import { ProductCard } from '../../common/ProductCard/ProductCard';

export const Product = () => {

    const [Products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (Products.length === 0) {
            allProducts()
                .then(response => {
                    setProducts(response.data.data)
                    setLoading(false)
                }
                )
                .catch(error => {
                    console.log(error)
                    console.error("Error fetching products", error)
                    setLoading(false)
                })
        }

    }, [Products])
    
    return (
        <div className='body'>
            <div className='productDesign'>
                {
                    Products.length > 0

                        ? (
                            <div className='productRoster'>
                                {
                                    Products.map(
                                        (product) => (
                                            <ProductCard
                                                key={product.id}
                                                article={product.article}
                                                description={product.description}
                                                product_id={product.id}

                                            />
                                        )

                                    )
                                }
                            </div>
                        )

                        : (<div className='waiting'>Loading<LoaderBar /></div>
                        )
                }
            </div>
        </div>
    );
};