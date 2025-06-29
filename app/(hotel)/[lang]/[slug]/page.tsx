import { notFound } from "next/navigation";
import { getBaseSlug, getTranslatedSlug } from "@/lib/slug-mapping";
import { getDictionary } from "@/lib/dictionary";

// Import all your page components
import BusinessMainPageAlt from "../../biznes/page";

// Define the mapping of base slugs to components
const pageComponents = {
  biznes: BusinessMainPageAlt,
  // Add other pages as you create them
  // restauracja: RestaurantPage,
  // pakiety: OffersPage,
  // spa: SpaPage,
  // etc.
};

// Generate static params for all slug variants
export async function generateStaticParams({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langTyped = lang as "pl" | "en";

  const baseRoutes = Object.keys(pageComponents);

  return baseRoutes.map((baseSlug) => ({
    slug: getTranslatedSlug(baseSlug, langTyped),
  }));
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const langTyped = lang as "pl" | "en";

  // Get the base slug from the current slug
  const baseSlug = getBaseSlug(slug);

  // Check if this is a valid translated slug for the current language
  const expectedSlug = getTranslatedSlug(baseSlug, langTyped);
  if (slug !== expectedSlug) {
    notFound();
  }

  // Get the corresponding page component
  const PageComponent = pageComponents[baseSlug as keyof typeof pageComponents];

  if (!PageComponent) {
    notFound();
  }

  // Render the page component with the original params structure
  return <PageComponent params={Promise.resolve({ lang })} />;
}
