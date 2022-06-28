import { Center, Grid, Pagination, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import api from "../../helpers/api";
import { ApiResponse } from "../../types/api";
import { FilterQueries } from "../../types/filters";
import { Product } from "../../types/product";
import { ErrorBox } from "../error-box";
import { Spinner } from "../spinner";
import { ProductCard } from "./product-card";

type ProductsData = ApiResponse<Product[]>;

const fetchProducts = async (
    category?: string | string[],
    page?: string | string[]
) => {
    if (Array.isArray(category) || Array.isArray(page)) return;

    const path = new URL("/api/products", api.defaults.baseURL);

    if (category) path.searchParams.append("category", category);
    if (page) path.searchParams.append("page", page.toString());

    const res = await api.get<ProductsData>(path.href);
    return res.data;
};

export function Catalog() {
    const router = useRouter();
    const { category, page } = router.query;
    const { data, isLoading, isError } = useQuery(
        ["products", { category, page }],
        () => fetchProducts(category, page)
    );

    if (isLoading) return <Spinner />;

    if (isError || !data)
        return <ErrorBox message="Couldn't fetch products." />;

    const products = data.data;
    const { totalPages, currentPage } = data.meta;

    const redirectToPage = async (page: number) => {
        let queries: FilterQueries = {};

        if (page) queries.page = page.toString();
        if (category && !Array.isArray(category)) queries.category = category;

        await router.push({
            pathname: router.pathname,
            query: queries,
        });
    };

    return (
        <Stack>
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
            <Center style={{ margin: "2em 0" }}>
                <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={redirectToPage}
                />
            </Center>
        </Stack>
    );
}
