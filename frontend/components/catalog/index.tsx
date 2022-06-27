import { Grid } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import api from "../../helpers/api";
import { ErrorBox } from "../error-box";
import { Spinner } from "../spinner";
import { ProductCard } from "./product-card";

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    price: string;
}

type ProductsData = { data: Product[] };

const fetchProducts = async (category?: string | string[]) => {
    if (typeof category === "object") return [];
    const path = `/products${category ? `?category=${category}` : ""}`;
    const res = await api.get<ProductsData>(path);
    return res.data.data;
};

export function Catalog() {
    const router = useRouter();
    const category = router.query.category;
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery(["products", category], () => fetchProducts(category));

    if (isLoading) return <Spinner />;

    if (isError || !products)
        return <ErrorBox message="Couldn't fetch products." />;

    return (
        <Grid>
            {products.map((product) => (
                <Grid.Col span={4} key={product.id}>
                    <ProductCard
                        slug={product.slug}
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
