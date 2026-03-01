/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

const SectionTwo = () => {
  return (
    <section className="px-6 py-12 mx-auto max-w-7xl md:px-4">
      <h1 className="mb-6 text-4xl text-deep font-georgiaBold">
        About African Expressions
      </h1>

      <div className="grid w-full grid-cols-1 gap-6 py-4 text-deep md:grid-cols-2 lg:gap-12">
        <div className="w-full text-base">
          <h3 className="text-xl font-georgiaBold">Natural beauty</h3>
          <p className="pb-3">
            African Expressions was born from the desire for Africa to share her
            natural beauty with the rest of the world. Through our unique range
            of yarns we express the essence of that which makes Africa magical.
          </p>
          <p className="py-3">
            Our network of local farmers breed stock bearing excellent fibres to
            ensure our yarns are naturally soft to the touch, easy to knit and
            luxuriously versatile.
          </p>
          <p className="py-3">
            365 days a year, 7 days a week, our farmers enjoy a close and
            special relationship with their herd and the animals enjoy a life
            unsurpassed, ensuring the production of a better quality of natural
            fibre for the benefit of all lovers of knitting.
          </p>
        </div>

        <div className="w-full">
          <Image
            src="/images/sheep_image.jpg"
            alt="sheep"
            width={6370}
            height={4247}
            className="object-cover w-full rounded-sm shadow-lg apsect-video"
          />
        </div>

        <div className="w-full">
          <Image
            src="/images/fibre.jpg"
            alt="Sheep"
            width={6037}
            height={3307}
            className="object-cover w-full rounded-sm shadow-lg apsect-video"
          />
        </div>
        <div className="w-full text-base">
          <h3 className="text-xl font-georgiaBold">Natural Fibres</h3>
          <p className="pb-3">
            From farm to store, each and every process is handled with the
            utmost of care to ensure that the fibres are treated delicately and
            with the respect that they deserve.
          </p>
          <p className="py-3">
            Our range of select colours is inspired by the landscapes of South
            Africa - from sunrise to sunset.
          </p>
          <p className="py-3">
            Each colour represents one small element that makes Africa, Africa.
            Our heart and soul is knitted firmly into Africa and would like to
            invite you to join us in this “African Expressions” Experience.
          </p>
          <p className="py-3">
            SAMIL Natural Fibres is the proud manufacturer of all of African
            Expressions yarns. Through its involvement in all aspects of the
            industry, SAMIL’s aim is to provide a sustainable, affordable,
            superior quality product to the world, showcasing not only the
            product but also the industry, country of origin and individuals
            participating in the production of the fibre.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
