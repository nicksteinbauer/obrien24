import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';

import {Heading, Text} from '~/components';

export function CartLineItem() {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise} = useCartLine();

  return (
    <li key={lineId} className="flex-sm justify cartIndividual">
      <div className="always-flex flex1 gap10">
        <div className="flex-shrink">
          <Image
            width={112}
            height={112}
            widths={[112]}
            data={merchandise.image}
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
            className="whiteBack"
          />
        </div>
        <div className="flex-vertical">
          <div className="allTogether">
            <Heading as="h3" size="copy">
              <Link to={`/products/${merchandise.product.handle}`}>
                {merchandise.product.title}
              </Link>
            </Heading>
            <div className="">
              {(merchandise?.selectedOptions || []).map((option) => (
                <Text color="subtle" className="options" key={option.name}>
                  {option.name}: {option.value}
                </Text>
              ))}
            </div>
            <Text>
              <CartLinePrice as="span" className="cartPrice" />
            </Text>
          </div>
        </div>
      </div>

      <div className="always-flex gap5 iterationContainer">
        <div className="flex justify-start flex-vertical">
          <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
        </div>
        <div className="flex-vertical">
          <button
            type="button"
            onClick={() => linesRemove([lineId])}
            className="trashButton"
          >
            <span className="sr-only">Remove</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="trashIcon"
            >
              <title className="titleRemove">Remove</title>
              <path
                transform="translate(4 4)"
                d="M1.0498 0.75C0.917196 0.75 0.790019 0.802679 0.696251 0.896447C0.602483 0.990215 0.549805 1.11739 0.549805 1.25V7.25C0.549805 7.38261 0.602483 7.50979 0.696251 7.60355C0.790019 7.69732 0.917196 7.75 1.0498 7.75C1.18241 7.75 1.30959 7.69732 1.40336 7.60355C1.49713 7.50979 1.5498 7.38261 1.5498 7.25V1.25C1.5498 1.11739 1.49713 0.990215 1.40336 0.896447C1.30959 0.802679 1.18241 0.75 1.0498 0.75ZM3.9498 0.75C3.8172 0.75 3.69002 0.802679 3.59625 0.896447C3.50248 0.990215 3.4498 1.11739 3.4498 1.25V7.25C3.4498 7.38261 3.50248 7.50979 3.59625 7.60355C3.69002 7.69732 3.8172 7.75 3.9498 7.75C4.08241 7.75 4.20959 7.69732 4.30336 7.60355C4.39713 7.50979 4.4498 7.38261 4.4498 7.25V1.25C4.4498 1.11739 4.39713 0.990215 4.30336 0.896447C4.20959 0.802679 4.08241 0.75 3.9498 0.75Z"
              />
              <path d="M12.5 2.5H8.97C8.93489 1.90332 8.72636 1.32986 8.37 0.85C7.94 0.32 7.3 0 6.5 0C5.7 0 5.06 0.32 4.63 0.85C4.27312 1.32958 4.06454 1.9032 4.03 2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3C0 3.13261 0.0526784 3.25979 0.146447 3.35355C0.240215 3.44732 0.367392 3.5 0.5 3.5H1.75V13.5C1.75 13.78 1.97 14 2.25 14H10.75C10.8826 14 11.0098 13.9473 11.1036 13.8536C11.1973 13.7598 11.25 13.6326 11.25 13.5V3.5H12.5C12.6326 3.5 12.7598 3.44732 12.8536 3.35355C12.9473 3.25979 13 3.13261 13 3C13 2.86739 12.9473 2.74021 12.8536 2.64645C12.7598 2.55268 12.6326 2.5 12.5 2.5ZM5.41 1.48C5.64 1.19 5.99 1 6.5 1C7.01 1 7.35 1.19 7.59 1.48C7.79 1.72 7.89 2.08 7.95 2.5H5.05C5.1 2.08 5.22 1.72 5.41 1.48ZM10.25 13H2.75V3.5H10.25V13Z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({lineId, quantity}) {
  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="always-flex cartAdjust">
        <CartLineQuantityAdjustButton
          adjust="decrease"
          aria-label="Decrease quantity"
          className="buttonDecrease"
        >
          &#8722;
        </CartLineQuantityAdjustButton>
        <CartLineQuantity as="div" className="flex-vertical flexFullWidth" />
        <CartLineQuantityAdjustButton
          adjust="increase"
          aria-label="Increase quantity"
          className="buttonAdd"
        >
          &#43;
        </CartLineQuantityAdjustButton>
      </div>
    </>
  );
}
