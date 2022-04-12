import React from "react";
import { createStyles, Header, Group, Burger, Container } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    inner: {
        height: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },
}));

interface HeaderSearchProps {
    links: {
        link: string;
        label: string;
    }[];
}

export function NavBar({ links }: HeaderSearchProps) {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes } = useStyles();

    const items = links.map((link) => {
        return (
            <Link key={link.label} href={link.link}>
                <a className={classes.link}>{link.label}</a>
            </Link>
        );
    });

    return (
        <Header height={56} mb={120}>
            <Container>
                <div className={classes.inner}>
                    <Link href="/">
                        <a className={classes.link}>Ecommerce</a>
                    </Link>

                    <Group spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    />
                </div>
            </Container>
        </Header>
    );
}
