/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import supabase from '../../../utils/supabase';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: pattern } = await supabase
    .from('patterns')
    .select('name')
    .eq('id', id)
    .single();

  return { title: pattern ? `${pattern.name} | African Expressions` : 'Pattern' };
}

async function getPattern(id: string) {
  const { data: pattern, error } = await supabase
    .from('patterns')
    .select('*, stitching(id, name), category(id, name), product_id(id, name)')
    .eq('id', id)
    .single();

  if (error || !pattern) return null;
  return pattern;
}

export default async function PatternPage({ params }: Props) {
  const { id } = await params;
  const pattern = await getPattern(id);

  if (!pattern) return notFound();

  return (
    <main className="max-w-7xl py-12 mx-auto px-6 relative lg:px-4">
      <Link href="/patterns" passHref>
        <button className="mt-8 bg-accent px-6 py-1 rounded text-white uppercase">
          Back To Patterns
        </button>
      </Link>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full">
          <Image
            height={1080}
            width={1080}
            className="w-full object-cover"
            src={pattern.image}
            alt={pattern.name}
          />
        </div>

        <div className="w-full">
          <h1 className="font-georgia uppercase text-2xl text-accent md:text-4xl">
            {pattern.name}
          </h1>
          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Stitching:</span>
            <span className="font-futuraBook">{(pattern.stitching as any)?.name}</span>
          </p>
          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Category:</span>
            <span className="font-futuraBook">{(pattern.category as any)?.name}</span>
          </p>
          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Yarn:</span>
            <span className="font-futuraBook">{(pattern.product_id as any)?.name}</span>
          </p>
          <a
            href={pattern.document}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-accent px-6 py-2 rounded text-white uppercase"
          >
            Download Pattern
          </a>
        </div>
      </div>
    </main>
  );
}
