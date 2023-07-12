import Image from "next/image";
const PinItem = ({ value }) => {
  const { title, id, desc, link, image, userName, userEmail, userImage } =
    value;
  return (
    <div className="w-80 bg-base-100 shadow-xl rounded-xl">
      <figure>
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex justify-end">
          <button className="btn btn-primary btn-sm text-sm">View</button>
        </div>
        <div className="flex gap-2 z-10 text-sm items-center">
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
    </div>
  );
};

export default PinItem;
