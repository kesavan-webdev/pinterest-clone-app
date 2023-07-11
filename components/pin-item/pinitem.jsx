import Image from "next/image";
const PinItem = ({ value }) => {
  const { title, id, desc, link, image, userName, userEmail, userImage } =
    value;
  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:z-0">
      <figure className="w-100 h-100">
        <Image src={image} alt={title} layout="fill" />
      </figure>
      <div className="card-body hover:z-10">
        <h2 className="card-title">{title}</h2>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <Image
            className="rounded-full"
            src={userImage}
            alt="user-profile-photo"
            width={50}
            height={50}
          />
        </div>
        <div>
          <h4>{userName}</h4>
          <h5>{userEmail}</h5>
        </div>
      </div>
    </div>
  );
};

export default PinItem;
