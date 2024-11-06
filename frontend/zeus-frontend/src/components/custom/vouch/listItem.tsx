interface data {
    address: string;
}

export default function ListItem(props: data) {
  return (
    <>
      <li className="my-1 bg-gray-800 sm:pb-4" style={{
        borderRadius: "0.5rem"
      }}>
        <div className="w-full h-full text-center pt-4">
          <div className="font-semibold text-gray-900 dark:text-white">
            {props.address}
          </div>
        </div>
      </li>
    </>
  );
}
