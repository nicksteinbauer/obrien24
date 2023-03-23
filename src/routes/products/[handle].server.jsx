import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  // Image,
  //Metafield,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
//import {getExcerpt} from '~/lib/utils';
import {
  NotFound,
  Layout,
  //ProductSwimlane
} from '~/components/index.server';
import {
  ProductDetail,
  ProductGallery,
  //ProductBanner,
  //Text,
} from '~/components';

import {BannerImage} from '../../components/obrien/meta/BannerImage.client';
import {FeatureFocus} from '../../components/obrien/meta/FeatureFocus.client';
import Locator from '../../components/obrien/Locator.client';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  const {
    media,
    title,
    vendor,
    descriptionHtml,
    id,
    productType,
    metafieldbanner,
    ffimage1,
    fftitle1,
    ffdescription1,
    ffimage2,
    fftitle2,
    ffdescription2,
  } = product;
  //const metafield = product.metafield;
  //const {shippingPolicy, refundPolicy} = shop;
  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];

  useServerAnalytics({
    shopify: {
      canonicalPath: `/products/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: id,
      products: [
        {
          product_gid: id,
          variant_gid: variantId,
          variant: variantTitle,
          name: title,
          brand: vendor,
          category: productType,
          price: priceV2.amount,
          sku,
        },
      ],
    },
  });

  const bannerImage = metafieldbanner?.reference?.image
    ? metafieldbanner?.reference?.image
    : null;

  const ffImage1 = ffimage1?.reference?.image
    ? ffimage1?.reference?.image
    : null;
  const ffTitle1 = fftitle1?.value ? fftitle1?.value : null;
  const ffDescription1 = ffdescription1?.value ? ffdescription1?.value : null;

  const ffImage2 = ffimage2?.reference?.image
    ? ffimage2?.reference?.image
    : null;
  const ffTitle2 = fftitle2?.value ? fftitle2?.value : null;
  const ffDescription2 = ffdescription2?.value ? ffdescription2?.value : null;
  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider data={product}>
        {bannerImage !== null && (
          <div className="bannerFix">
            <BannerImage myImage={bannerImage} />
          </div>
        )}
        <section
          className={`inside-xl buyBox ${bannerImage === null && 'noBanner'}`}
        >
          <div className="flex-md">
            <ProductDetail
              title="Product Details"
              content={descriptionHtml}
              heading={title}
            />
            <ProductGallery media={media.nodes} className="seventy" />
          </div>
        </section>
        {ffImage1 !== null && (
          <div>
            <FeatureFocus
              ffImage1={ffImage1}
              ffTitle1={ffTitle1}
              ffDescription1={ffDescription1}
              ffImage2={ffImage2}
              ffTitle2={ffTitle2}
              ffDescription2={ffDescription2}
            />
          </div>
        )}
        <Locator />
        {/* <Suspense>
          <ProductSwimlane title="Related Products" data={id} />
        </Suspense> */}
      </ProductOptionsProvider>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      metafieldbanner: metafield(namespace: "custom", key: "banner") {
        value
        reference {
          ... on MediaImage {
            image {
              url
              width
              height
              id
              altText
            }
          }
        }
      }
      ffimage1: metafield(namespace: "custom", key: "ff1_image") {
        value
        description
        reference {
          ... on MediaImage {
            image {
              url
              width
              height
              id
              altText
            }
          }
        }
      }
      fftitle1: metafield(namespace: "custom", key: "ff1_title") {
        value
      }
      ffdescription1: metafield(namespace: "custom", key: "ff1_description") {
        value
      }
      ffimage2: metafield(namespace: "custom", key: "ff2_image") {
        value
        description
        reference {
          ... on MediaImage {
            image {
              url
              width
              height
              id
              altText
            }
          }
        }
      }
      fftitle2: metafield(namespace: "custom", key: "ff2_title") {
        value
      }
      ffdescription2: metafield(namespace: "custom", key: "ff2_description") {
        value
      }
      productType
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
