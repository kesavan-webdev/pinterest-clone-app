import PinItem from "../pin-item/pinitem";

const PinList = ({ listOfPins }) => {
  return listOfPins.map((value, index) => {
    return <PinItem value={value} key={index} />;
  });
};

export default PinList;
