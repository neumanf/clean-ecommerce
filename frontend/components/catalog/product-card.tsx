import React from "react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Button,
} from "@mantine/core";
import Link from "next/link";

import { Product } from "../../types/product";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export type ProductCardProps = Omit<Product, "id">;

export function ProductCard({
    slug,
    name,
    description,
    imageUrl,
    price,
    category,
}: ProductCardProps) {
    const { classes } = useStyles();

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Link href={`/product/${slug}`} passHref>
                    <Text component="a">
                        <Image src={imageUrl} alt={name} />
                    </Text>
                </Link>
            </Card.Section>

            <Group position="apart" mt="xs" mb="xs">
                <div>
                    <Link href={`/product/${slug}`} passHref>
                        <Text component="a" weight={500} lineClamp={1}>
                            {name}
                        </Text>
                    </Link>
                    <Text size="xs" color="dimmed" lineClamp={1}>
                        {description}
                    </Text>
                </div>
                <Badge variant="outline">{category}</Badge>
            </Group>

            <Card.Section className={classes.section}>
                <Group spacing={30}>
                    <div>
                        <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                            {`$ ${price}`}
                        </Text>
                    </div>

                    <Button radius="xl" style={{ flex: 1 }}>
                        Buy
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    );
}
