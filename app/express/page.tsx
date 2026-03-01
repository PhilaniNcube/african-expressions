import type { Metadata } from 'next';
import { eq, asc } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../db';
import { products } from '../../db/schema';
import ProductGrid from '../../components/layout/ProductGrid';

export const metadata: Metadata = {
  title: 'Express Yourself | African Expressions',
};

async function getExpressProducts() {
  'use cache';
  cacheLife('hours');
  cacheTag('express-products');

  return db
    .select()
    .from(products)
    .where(eq(products.type, 'express'))
    .orderBy(asc(products.name));
}

export default async function ExpressPage() {
  const products = await getExpressProducts();

  return (
    <div className="px-6 mx-auto my-8 max-w-7xl md:px-4">
      <h1 className="text-2xl font-georgiaBold md:text-4xl lg:text-5xl text-accent">
        Express Yourself
      </h1>
      <p className="my-4 text-deep">
        Let creativity free with the Express Yourself yarn bases. 100% natural
        yarns for 100% enjoyment. Use our tutorials to add a splash of colour
        and personal touch to your project.
      </p>

      <ProductGrid products={products} />

      <h1 className="mt-6 text-2xl font-georgiaBold md:text-4xl lg:text-5xl text-deep">
        Tutorials
      </h1>

      <div className="grid w-full grid-cols-1 gap-4 mt-3 md:grid-cols-3">
        <div className="w-full object-cover h-full aspect-[5/4]">
          <iframe
            className="w-full object-cover h-full aspect-[5/4]"
            src="https://www.youtube.com/embed/st_qKR9lrZE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="w-full object-cover h-full aspect-[5/4]">
          <iframe
            className="w-full object-cover h-full aspect-[5/4]"
            src="https://www.youtube.com/embed/t0bVjMmdi0o"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="w-full object-cover h-full aspect-[5/4]">
          <iframe
            className="w-full object-cover h-full aspect-[5/4]"
            src="https://www.youtube.com/embed/T11flBhXCzo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
