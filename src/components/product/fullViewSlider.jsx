"sue client";
import React, { useState } from "react";
import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function FullViewSlider({ images, show, close, index }) {
  const [Index, setIndex] = useState(index);

  return !show ? null : (
    <>
      <PhotoProvider
        speed={() => 800}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      >
        <div className="foo">
          <PhotoSlider
            images={images.map((item) => ({
              src: `${process.env.NEXT_PUBLIC_BACKEND_URL}/GetImage/${item?.filename}`,
              key: item,
            }))}
            visible={show}
            onClose={close}
            index={Index}
            onIndexChange={setIndex}
          />
        </div>
      </PhotoProvider>
    </>
  );
}
