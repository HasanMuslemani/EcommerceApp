import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const Products = () => {

    const [data, setData] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("electronics");
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(`https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/products/category/${category}`);
            if (componentMounted) {
                setData(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, [category]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex flex-wrap justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => {setCategory("all");}}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {setCategory("electronics");}}>Electronic</button>
                </div>
                {data.data.map((product) => {
                    
                    return (
                        <>
                            <div className="col-md-4 col-sm-6 col-xl-3 mb-4">
                                <div class="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.img_url} class="card-img-top" alt={product.title} />
                                    <div class="card-body">
                                        <h5 class="card-title">{product.name.length >= 15 ? product.name.substring(0, 12) + "..." : product.name}</h5>
                                        <p class="card-text lead fw-bold">${product.price}</p>
                                        <Link to={`/products/${product.id}`} class="btn btn-outline-dark">View</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}

export default Products;
