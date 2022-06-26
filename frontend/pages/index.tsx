import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Catalog } from "../components/catalog";
import { Filters } from "../components/filters";

const Home: NextPage = () => {
    const { query } = useRouter();
    const activeCategory =
        query.category && typeof query.category === "string"
            ? query.category
            : "";
    const categories = [
        { label: "T-Shirts", link: "?category=tshirt", order: 1 },
        { label: "Shirts", link: "?category=shirt", order: 1 },
        { label: "Suits", link: "?category=suit", order: 1 },
    ];

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ minWidth: "10%", marginRight: "10%" }}>
                <Filters
                    links={categories}
                    active={`?category=${activeCategory}`}
                />
            </div>
            <Catalog />
        </div>
    );
};

export default Home;
