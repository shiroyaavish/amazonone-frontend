import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const appUrl = "https://dealmitra.online"
    const [categoriesRes, productsRes, blogsRes] = await Promise.all([
        fetch(`${baseUrl}/category`, { cache: "no-store" }),
        fetch(`${baseUrl}/product/withoutPage`, { cache: "no-store" }),
        fetch(`${baseUrl}/blog`, { cache: "no-store" }),
    ]);

    // if any API failed or returned HTML
    if (!categoriesRes.ok || !productsRes.ok || !blogsRes.ok) {
        console.log(categoriesRes)
        console.log(productsRes)
        console.log(blogsRes)
        console.error("❌ One of the sitemap API responses is not JSON");
        return [];
    }

    const categoriesJson = await categoriesRes.json().catch(() => null);
    const productsJson = await productsRes.json().catch(() => null);
    const blogsJson = await blogsRes.json().catch(() => null);

    const categories = categoriesJson?.data ?? [];
    const products = productsJson?.data ?? [];
    const blogs = blogsJson?.blogs ?? [];

    return [
        {
            url: appUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${appUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${appUrl}/wishlist`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${appUrl}/ai-compare`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${appUrl}/product/bestseller`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },

        // dynamic data
        ...categories.map((c: any) => ({
            url: `${appUrl}/category/${c.name}?category=${c._id}`,
            lastModified: new Date(c.updatedAt || new Date()),
            changeFrequency: "daily",
            priority: 0.9,
        })),

        ...products.map((p: any) => ({
            url: `${appUrl}/product/${p.slug}`,
            lastModified: new Date(p.updatedAt || new Date()),
            changeFrequency: "daily",
            priority: 1,
        })),

        ...blogs.map((b: any) => ({
            url: `${appUrl}/blog/${b.slug}`,
            lastModified: new Date(b.updatedAt || new Date()),
            changeFrequency: "weekly",
            priority: 0.7,
        })),
    ];
}
