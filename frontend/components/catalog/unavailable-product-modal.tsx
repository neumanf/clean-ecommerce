import React from "react";
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";

import api from "../../helpers/api";

interface UnavailableProductModalProps {
    slug: string;
    modalOpened: boolean;
    setModalOpened: (value: boolean) => void;
}

interface FormFields {
    email: string;
    address: string;
    message: string;
}

export function UnavailableProductModal({
    slug,
    modalOpened,
    setModalOpened,
}: UnavailableProductModalProps) {
    const { mutate, isLoading } = useMutation(
        async (formFields: FormFields) =>
            api.post(`/products/${slug}/unavailable`, {
                userEmail: formFields.email,
                userAddress: formFields.address,
                userMessage: formFields.message,
            }),
        {
            onSuccess: () => setModalOpened(false),
        }
    );
    const form = useForm({
        initialValues: {
            email: "",
            address: "",
            message: "",
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });

    return (
        <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Product unavailable"
        >
            <p>Get notified when the product is available</p>
            <form onSubmit={form.onSubmit((values) => mutate(values))}>
                <TextInput
                    required
                    label="Email"
                    placeholder="your@email.com"
                    mb="sm"
                    {...form.getInputProps("email")}
                />
                <TextInput
                    required
                    label="Address"
                    placeholder="e.g: 90210 Broadway Blvd. Nashville, TN 37011-5678"
                    mb="sm"
                    {...form.getInputProps("address")}
                />
                <Textarea
                    label="Message"
                    placeholder=""
                    mb="sm"
                    {...form.getInputProps("message")}
                />

                <Group position="right" mt="md">
                    <Button type="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
