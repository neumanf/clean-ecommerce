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

export interface ProductCardProps {
    name: string;
    price: string;
    description: string;
    category: string;
    imageUrl: string;
}

export function ProductCard({
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
                <Image src={imageUrl} alt={name} />
            </Card.Section>

            <Group position="apart" mt="xs" mb="xs">
                <div>
                    <Text weight={500} lineClamp={1}>
                        {name}
                    </Text>
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
