import * as cuid from 'cuid';

export const slugify = (str: string) =>
    str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .concat('-', cuid.slug());
