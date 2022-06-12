import type { NextPage } from "next";
import { Container } from "@mantine/core";

import { NavBar } from "../components/navbar";
import { navBarLinks } from "../components/navbar/links";
import { Catalog } from "../components/catalog";

const Home: NextPage = () => {
    return (
        <>
            <NavBar links={navBarLinks} />
            <Container>
                <Catalog />
            </Container>
        </>
    );
};

export default Home;
