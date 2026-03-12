/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import { patterns, products, categories, stitching } from '../../../db/schema';

type Props = { params: Promise<{ id: string }> };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isPatternId(id: string) {
  return UUID_PATTERN.test(id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!isPatternId(id)) {
    return { title: 'Pattern' };
  }

  const row = await db
    .select()
    .from(patterns)
    .where(eq(patterns.id, id))
    .then((rows) => rows[0] ?? null);

  return { title: row ? `${row.name} | African Expressions` : 'Pattern' };
}

async function getPattern(id: string) {
  'use cache';

  if (!isPatternId(id)) {
    return null;
  }

  cacheLife('hours');
  cacheTag('patterns');

  const row = await db
    .select({
      id: patterns.id,
      name: patterns.name,
      image: patterns.image,
      document: patterns.document,
      stitching: { id: stitching.id, name: stitching.name },
      category: { id: categories.id, name: categories.name },
      product_id: { id: products.id, name: products.name },
    })
    .from(patterns)
    .leftJoin(stitching, eq(patterns.stitching, stitching.id))
    .leftJoin(categories, eq(patterns.category, categories.id))
    .leftJoin(products, eq(patterns.product_id, products.id))
    .where(eq(patterns.id, id))
    .then((rows) => rows[0] ?? null);

  return row;
}

export default async function PatternPage({ params }: Props) {
  const { id } = await params;
  const pattern = await getPattern(id);

  if (!pattern) return notFound();

  return (
    <main className="relative px-6 py-12 mx-auto max-w-7xl lg:px-4">
      <Link href="/patterns" passHref>
        <button className="px-6 py-1 mt-8 text-white uppercase rounded bg-accent">
          Back To Patterns
        </button>
      </Link>
      <div className="grid grid-cols-1 gap-6 my-4 md:grid-cols-2">
        <div className="relative w-full">
          <Image
            height={1080}
            width={1080}
            className="object-cover w-full"
            src={pattern.image}
            alt={pattern.name}
          />
        </div>

        <div className="w-full">
          <h1 className="text-2xl uppercase font-georgia text-accent md:text-4xl">
            {pattern.name}
          </h1>
          <p className="mb-2 text-md text-deep">
            <span className="mr-6 font-futuraBold">Stitching:</span>
            <span className="font-futuraBook">{(pattern.stitching as any)?.name}</span>
          </p>
          <p className="mb-2 text-md text-deep">
            <span className="mr-6 font-futuraBold">Category:</span>
            <span className="font-futuraBook">{(pattern.category as any)?.name}</span>
          </p>
          <p className="mb-2 text-md text-deep">
            <span className="mr-6 font-futuraBold">Yarn:</span>
            <span className="font-futuraBook">{(pattern.product_id as any)?.name}</span>
          </p>
          <a
            href={pattern.document}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-2 mt-6 text-white uppercase rounded bg-accent"
          >
            Download Pattern
          </a>
        </div>
      </div>
    </main>
  );
}
