import { Center, Grid, Loader } from "@mantine/core";
import React from "react";
import { useQuery } from "react-query";

import api from "../../helpers/api";
import { Spinner } from "../spinner";
import { ProductCard } from "./product-card";

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    price: string;
}

type ProductsData = { data: Product[] };

const fetchProducts = async () => {
    const res = await api.get<ProductsData>("/products");
    return res.data.data;
};

export function Catalog() {
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery("products", fetchProducts);

    if (isLoading) return <Spinner />;

    if (isError || !products) return <>Error while fetching products</>;

    return (
        <Grid>
            {products.map((product: any) => (
                <Grid.Col span={4} key={product.id}>
                    <ProductCard
                        name={product.name}
                        description={product.description}
                        category={product.category}
                        price={product.price}
                        imageUrl={product.imageUrl}
                    />
                </Grid.Col>
            ))}
        </Grid>
    );
}
