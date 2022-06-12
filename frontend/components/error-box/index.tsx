import { Text, Paper } from "@mantine/core";

type ErrorBoxMessage = { message?: string };

export function ErrorBox({ message }: ErrorBoxMessage) {
    return (
        <Paper
            sx={(theme) => ({
                backgroundColor: theme.colors.red[1],
            })}
            shadow="xs"
            p="md"
            withBorder
        >
            <Text color="red" weight={900}>
                Error
            </Text>
            <Text color="grey">{message}</Text>
        </Paper>
    );
}
