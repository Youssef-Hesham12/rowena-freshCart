import { getUserAddresses } from "@/actions/addresses.actions";
import AddAddressButton from "@/components/shared/AddAddressButton/AddAddressButton";
import AddressCard from "@/components/shared/AddressCard/AddressCard";
import { UserAddressesType } from "@/types/addresses.types";

export default async function Addresses() {
  const userAddresses: UserAddressesType = await getUserAddresses();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Manage your saved delivery addresses
          </p>
        </div>
        <AddAddressButton isCheckout={false} />
      </div>
      {userAddresses?.data?.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
            <svg
              data-prefix="fas"
              data-icon="location-dot"
              className="w-[37.5px] h-7.5 text-gray-400"
              role="img"
              viewBox="0 0 384 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Addresses Yet
          </h3>
          <p className="text-gray-500 font-medium mb-6 max-w-sm mx-auto">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <AddAddressButton isFirstAddress={true} />
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userAddresses?.data?.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              isCheckOut={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
