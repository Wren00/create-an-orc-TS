import { z } from "zod";

export type ParseResult<T> =
    | { ok: true; value: T }
    | { ok: false; error: string };

export function parseJsonWithSchema<T>(raw: string, schema: z.ZodType<T>): ParseResult<T> {
    try {
        const data = JSON.parse(raw);
        const value = schema.parse(data);
        return { ok: true, value };
    } catch (e: any) {
        if (e?.name === "ZodError") {
            const details = e.issues.map((i: any) => `${i.path.join(".")}: ${i.message}`).join("; ");
            return { ok: false, error: details };
        }
        return { ok: false, error: e?.message ?? "Invalid JSON" };
    }
}