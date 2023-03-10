// @ts-expect-error @headlessui/react incompatibility with node16 resolution

//import {Text} from '~/components';
import {ProductForm} from '~/components';

export function ProductDetail({content, heading}) {
  return (
    <>
      <div className="thirty contentBoxContainer">
        <section className="contentBox">
          <h1 className="padding">{heading}</h1>
          <div className="priceFix padding">
            <div className="fixySize">
              <div
                className="buyBoxHTML"
                dangerouslySetInnerHTML={{__html: content}}
              />
            </div>
            <ProductForm />
          </div>
        </section>
      </div>
    </>
  );
}
