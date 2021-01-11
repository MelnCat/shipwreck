type ExtractPromise<T> = T extends Promise<infer U> ? U : never;

declare module "neo-blessed" {
	export * from "@types/blessed";
}