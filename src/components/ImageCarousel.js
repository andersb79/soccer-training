import React, { useState } from "react";
import { observer } from "mobx-react";
import SecurityIcon from "@material-ui/icons/Security";
import { Image } from "cloudinary-react";
var Carousel = require("react-responsive-carousel").Carousel;

function ImageCarousel({ list }) {
  const [selectedItem, setSelectedItem] = useState(0);

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
        {list.map(
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

export default observer(ImageCarousel);
