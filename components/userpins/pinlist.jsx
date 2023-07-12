import PinItem from "../pin-item/pinitem";

const PinList = ({ listOfPins }) => {
  console.log(listOfPins);
  return (
    <div className="mt-7 px-2 md:px-5 columns-2 md:columns-3 lg-col-span-4 xl-col-span-5 space-y-6 mx-auto">
      {listOfPins.map((value, index) => {
        return (
          <div key={index}>
            <PinItem value={value} />
          </div>
        );
      })}
    </div>
  );
};

export default PinList;
