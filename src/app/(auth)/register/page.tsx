import RegisterForm from "@/components/Register/RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <section className="py-10">
      <div className="container max-w-7xl! mx-auto p-4!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-primary-600">FreshCart</span>
            </h1>
            <p className="text-xl font-medium mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
            <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
              <li>
                <div className="size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    width="23"
                    height="20"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0056 0.460547C11.8615 0.179297 11.5697 0 11.2533 0C10.9369 0 10.6451 0.179297 10.5009 0.460547L7.91344 5.53008L2.29196 6.42305C1.97907 6.47227 1.71891 6.69375 1.62047 6.99609C1.52203 7.29844 1.60289 7.62891 1.82438 7.85391L5.84625 11.8793L4.96032 17.5008C4.9111 17.8137 5.04118 18.1301 5.29782 18.3164C5.55446 18.5027 5.89196 18.5309 6.17672 18.3867L11.2533 15.8063L16.3263 18.3867C16.6076 18.5309 16.9486 18.5027 17.2052 18.3164C17.4619 18.1301 17.592 17.8172 17.5427 17.5008L16.6533 11.8793L20.6752 7.85391C20.9002 7.62891 20.9775 7.29844 20.8791 6.99609C20.7806 6.69375 20.524 6.47227 20.2076 6.42305L14.5896 5.53008L12.0056 0.460547Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Premium Quality</h2>
                  <p className="text-gray-600 font-medium">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    width="23"
                    height="18"
                    viewBox="0 0 23 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 3.375C2.25 2.13398 3.25898 1.125 4.5 1.125H14.625C15.866 1.125 16.875 2.13398 16.875 3.375V4.5H18.6574C19.2551 4.5 19.8281 4.73555 20.25 5.15742L21.8426 6.75C22.2645 7.17188 22.5 7.74492 22.5 8.34258V13.5C22.5 14.741 21.491 15.75 20.25 15.75H20.134C19.7684 17.0473 18.573 18 17.1562 18C15.7395 18 14.5477 17.0473 14.1785 15.75H10.5715C10.2059 17.0473 9.01055 18 7.59375 18C6.17695 18 4.98516 17.0473 4.61602 15.75H4.5C3.25898 15.75 2.25 14.741 2.25 13.5V11.8125H0.84375C0.376172 11.8125 0 11.4363 0 10.9688C0 10.5012 0.376172 10.125 0.84375 10.125H4.78125C5.24883 10.125 5.625 9.74883 5.625 9.28125C5.625 8.81367 5.24883 8.4375 4.78125 8.4375H0.84375C0.376172 8.4375 0 8.06133 0 7.59375C0 7.12617 0.376172 6.75 0.84375 6.75H7.03125C7.49883 6.75 7.875 6.37383 7.875 5.90625C7.875 5.43867 7.49883 5.0625 7.03125 5.0625H0.84375C0.376172 5.0625 0 4.68633 0 4.21875C0 3.75117 0.376172 3.375 0.84375 3.375H2.25ZM20.25 10.125V8.34258L18.6574 6.75H16.875V10.125H20.25ZM9 14.9062C9 14.5333 8.85184 14.1756 8.58812 13.9119C8.3244 13.6482 7.96671 13.5 7.59375 13.5C7.22079 13.5 6.8631 13.6482 6.59938 13.9119C6.33566 14.1756 6.1875 14.5333 6.1875 14.9062C6.1875 15.2792 6.33566 15.6369 6.59938 15.9006C6.8631 16.1643 7.22079 16.3125 7.59375 16.3125C7.96671 16.3125 8.3244 16.1643 8.58812 15.9006C8.85184 15.6369 9 15.2792 9 14.9062ZM17.1562 16.3125C17.5292 16.3125 17.8869 16.1643 18.1506 15.9006C18.4143 15.6369 18.5625 15.2792 18.5625 14.9062C18.5625 14.5333 18.4143 14.1756 18.1506 13.9119C17.8869 13.6482 17.5292 13.5 17.1562 13.5C16.7833 13.5 16.4256 13.6482 16.1619 13.9119C15.8982 14.1756 15.75 14.5333 15.75 14.9062C15.75 15.2792 15.8982 15.6369 16.1619 15.9006C16.4256 16.1643 16.7833 16.3125 17.1562 16.3125Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Fast Delivery</h2>
                  <p className="text-gray-600 font-medium">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li>
                <div className="size-12 text-lg bg-primary-200 text-primary-600 rounded-full flex justify-center items-center">
                  <svg
                    width="23"
                    height="18"
                    viewBox="0 0 23 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2499 0C11.4116 0 11.5734 0.0351563 11.721 0.101953L18.3444 2.91094C19.1179 3.23789 19.6945 4.00078 19.6909 4.92188C19.6734 8.40938 18.239 14.7902 12.1816 17.6906C11.5944 17.9719 10.9124 17.9719 10.3253 17.6906C4.26437 14.7902 2.83351 8.40938 2.81593 4.92188C2.81242 4.00078 3.38898 3.23789 4.16242 2.91094L10.7823 0.101953C10.93 0.0351563 11.0882 0 11.2499 0ZM11.2499 2.34844V15.641C16.1015 13.2926 17.4058 8.08945 17.4374 4.97461L11.2499 2.35195V2.34844Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Secure Shopping</h2>
                  <p className="text-gray-600 font-medium">
                    Your data and payments are completely secure
                  </p>
                </div>
              </li>
            </ul>
            <div className="bg-white shadow-sm p-4 rounded-md">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  alt=""
                  width="512"
                  height="512"
                  className="size-12 rounded-full"
                  src="/images/7be87acff8878d0ff905ef9dcd5bf7d2fd7a6c6f.png"
                />
                <div>
                  <h3>Sarah Johnson</h3>
                  <div className="flex pt-0.75 pb-1.25">
                    {[...Array(5)].map((_, i) => (
                      <svg
                      key={i}
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6718 0.409375C10.5437 0.159375 10.2843 0 10.0031 0C9.72183 0 9.46246 0.159375 9.33433 0.409375L7.03433 4.91563L2.03746 5.70937C1.75933 5.75312 1.52808 5.95 1.44058 6.21875C1.35308 6.4875 1.42496 6.78125 1.62183 6.98125L5.19683 10.5594L4.40933 15.5562C4.36558 15.8344 4.48121 16.1156 4.70933 16.2812C4.93746 16.4469 5.23746 16.4719 5.49058 16.3438L10.0031 14.05L14.5125 16.3438C14.7625 16.4719 15.0656 16.4469 15.2937 16.2812C15.5218 16.1156 15.6375 15.8375 15.5937 15.5562L14.8031 10.5594L18.3781 6.98125C18.5781 6.78125 18.6468 6.4875 18.5593 6.21875C18.4718 5.95 18.2437 5.75312 17.9625 5.70937L12.9687 4.91563L10.6718 0.409375Z"
                          fill="#FFDF20"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="italic text-gray-600 font-medium">
                  &quot;FreshCart has transformed my shopping experience. The quality
                  of the products is outstanding, and the delivery is always on
                  time. Highly recommend!&quot;
                </p>
              </div>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
