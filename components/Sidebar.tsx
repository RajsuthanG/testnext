import Progress from "./stepper/Progress";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 w-4/12 p-10 h-screen fixed tab:hidden">
      <img
        src="/logo.sootchy.svg"
        alt=""
        className="flex items-center justify-center"
      />
      <p className="mt-7 text-2xl font-semibold font-poppins">
        Get Started by Gifting a <br /> loved one.
      </p>

      <div className="mt-16">
        <Progress />
      </div>
      <div className="absolute bottom-5 left-0 right-0  m-auto">
        <p className="mt-2 text-xs text-center text-gray-600 font-poppins">
          Sootchy makes sending gifts to your family <br /> and friends easier
          then ever.
        </p>
        <p className="text-center mt-2 text-xs text-gray-400 font-poppins">
          Copyright &copy; 2021. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
