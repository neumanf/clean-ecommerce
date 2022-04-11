import { Button, Dialog, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Button onClick={() => setOpened((o) => !o)}>Hello</Button>

            <Dialog
                opened={opened}
                withCloseButton
                onClose={() => setOpened(false)}
                size="lg"
                radius="md"
            >
                <Text>Hello!</Text>
            </Dialog>
        </>
    );
};

export default Home;
