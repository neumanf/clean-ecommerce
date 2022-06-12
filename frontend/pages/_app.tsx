import { AppProps } from "next/app";
import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

import { NavBar } from "../components/navbar";
import { navBarLinks } from "../components/navbar/links";

const queryClient = new QueryClient();

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Clean Ecommerce</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <QueryClientProvider client={queryClient}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "light",
                    }}
                >
                    <NavBar links={navBarLinks} />
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </MantineProvider>
            </QueryClientProvider>
        </>
    );
}
