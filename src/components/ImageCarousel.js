import React, { useState } from "react";
import { observer } from "mobx-react";
import { Image } from "cloudinary-react";
var Carousel = require("react-responsive-carousel").Carousel;

function ImageCarousel({ list, images }) {
  const [selectedItem, setSelectedItem] = useState(0);
  console.log("list", list);
  console.log("images", images);

  if (list) {
    return (
      <div>
        <Carousel
          selectedItem={selectedItem}
          // onChange={onChange}
          showThumbs={false}
          showArrows={true}
          showIndicators={true}
          showStatus={false}
        >
          {list &&
            list.map(
              (publicId, index) =>
                publicId && (
                  <Image
                    cloudName="deolievif"
                    publicId={publicId}
                    width="100%"
                    height="100%"
                  />
                )
            )}
        </Carousel>
      </div>
    );
  }

  return (
    <div>
      <Carousel
        selectedItem={selectedItem}
        // onChange={onChange}
        showThumbs={false}
        showArrows={true}
        showIndicators={true}
        showStatus={false}
      >
        {images &&
          images.map(
            (item, index) =>
              item.src && (
                <img
                  key={item.id}
                  className="previewImage"
                  id="image"
                  src={item.src}
                  width="100%"
                  height="100%"
                />
              )
          )}
      </Carousel>
    </div>
  );
}

export default observer(ImageCarousel);
