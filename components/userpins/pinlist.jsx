import PinItem from "../pin-item/pinitem";

const PinList = ({ listOfPins }) => {
  console.log(listOfPins);
  return listOfPins.map((value, index) => {
    return (
      <>
        <div className="mt-7 px-2 md:px-5 columns-2 md:columns-3 lg-columns-4 xl-columns-5 space-y-6 mx-auto">
          <PinItem value={value} key={index} />
        </div>
      </>
    );
  });
};

export default PinList;
