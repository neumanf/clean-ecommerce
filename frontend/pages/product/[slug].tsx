import { Button, Group, Text, Title, Image, createStyles } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { GlassMagnifier } from "react-image-magnifiers";

import { Product } from "../../components/catalog";
import { ErrorBox } from "../../components/error-box";
import { Spinner } from "../../components/spinner";
import api from "../../helpers/api";

const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing.xl * 4,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 480,
        width: "50vw",
        marginLeft: theme.spacing.xl * 3,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan("xs")]: {
            fontSize: 28,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },
}));

type ProductData = { data: Product };

const fetchProduct = async (slug?: string | string[]) => {
    if (typeof slug !== "string") throw new Error("slug must be a string");
    const res = await api.get<ProductData>(`/products/${slug}`);
    return res.data.data;
};

export default function ProductDetails() {
    const { classes } = useStyles();
    const router = useRouter();
    const slug = router.query.slug;
    const {
        data: product,
        isLoading,
        isIdle,
        isError,
    } = useQuery(
        ["product", slug],
        ({ queryKey }) => fetchProduct(queryKey[1]),
        {
            enabled: !!slug,
        }
    );

    if (isLoading || isIdle) return <Spinner />;

    if (isError || !product)
        return <ErrorBox message="Couldn't fetch product." />;

    return (
        <div className={classes.inner}>
            <GlassMagnifier
                imageSrc={product.imageUrl}
                className={classes.image}
                imageAlt={product.name}
                magnifierSize="40%"
            />
            <div className={classes.content}>
                <Title className={classes.title}>{product.name}</Title>
                <Text color="dimmed" mt="md">
                    {product.description}
                </Text>

                <Group mt={30} position="apart">
                    <Title>$ {product.price}</Title>
                    <Button radius="xl" size="md" ml={10}>
                        Buy
                    </Button>
                </Group>
            </div>
        </div>
    );
}
