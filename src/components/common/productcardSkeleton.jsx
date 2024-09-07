const { Skeleton } = require("../ui/skeleton");

export const renderSkeletons = (count, className) =>
  Array(count)
    .fill()
    .map((_, index) => {
      const colors = [
        "#86A69D",
        "#F2B263",
        "#F2E8DF",
        "#F2C6C2",
        "#F28585",
        "#DCC3A1",
        "#646C8F",
        "#FFE3CC",
        "#FFC2B5",
        "#8F797E",
        "#D7D7D9",
        "#4F6F8C",
        "#94A69F",
        "#F7D6D2",
        "#3C5473",
        "#98B3B1",
        "#D3D9CB",
        "#FFF9F1",
        "#FFDCBA",
        "#F2B58F",
      ];
      function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      }

      const randomColor = getRandomColor();

      return (
        <div key={index} className="flex flex-col space-y-2">
          <Skeleton
            randomColor={randomColor}
            className={`sm:h-[310px] xs:h-[250px] h-[280px]  w-full rounded-[8px] bg-[#CCCCCC]/90`}
          />
          <Skeleton
            randomColor={randomColor}
            className={`h-7 w-full rounded-lg bg-[#CCCCCC]/90`}
          />
          <Skeleton
            randomColor={randomColor}
            className={`h-7 w-full rounded-lg bg-[#CCCCCC]/90`}
          />
        </div>
      );
    });
