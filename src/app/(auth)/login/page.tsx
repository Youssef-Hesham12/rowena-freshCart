import LoginForm from "@/components/Login/LoginForm";
import Image from "next/image";
import { FaClock, FaShieldHalved, FaTruck } from "react-icons/fa6";

export default function Login() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <Image
                className="w-full h-96 object-cover rounded-[16px] shadow-lg"
                alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
                src="/images/fresh vegetables and fruits shopping cart.png"
                width={616}
                height={384}
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg font-medium text-gray-600">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm font-medium text-gray-500">
                  <div className="flex items-center">
                    <FaTruck className="w-[17.5px] h-3.5 text-primary-600 mr-2" />
                    Free Delivery
                  </div>
                  <div className="flex items-center">
                    <FaShieldHalved className="w-[17.5px] h-3.5 text-primary-600 mr-2" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <FaClock className="w-[17.5px] h-3.5 text-primary-600 mr-2" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
