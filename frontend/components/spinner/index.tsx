import { Center, Loader } from "@mantine/core";

export function Spinner() {
    return (
        <Center style={{ width: "50vw", height: "50vh" }}>
            <Loader />
        </Center>
    );
}
