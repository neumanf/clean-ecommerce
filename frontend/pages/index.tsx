import type { NextPage } from "next";

import { NavBar } from "../components/navbar";
import { navBarLinks } from "../components/navbar/links";

const Home: NextPage = () => {
    return (
        <>
            <NavBar links={navBarLinks} />
        </>
    );
};

export default Home;
