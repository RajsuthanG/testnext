type FormAlertProps = {
  errors: [] | any; // Temporily Typed
};

const FormAlert = ({ errors }: FormAlertProps) => {
  return (
    <div className="flex bg-red-50 rounded-lg p-3 items-start mt-6 transition">
      <img className="w-6" src="/closeicon.svg" alt="" />
      <div>
        <div className="font-poppins text-sm px-3 font-medium text-red-800">
          {errors.length <= 3
            ? `There ${errors.length > 1 ? "were" : "was"} ${
                errors.length
              } error${errors.length > 1 ? "s" : ""} with your submission`
            : "Please fill all fields correctly"}
        </div>
        {errors.length <= 3 ? (
          <div className="mt-1">
            {errors.map((error: { message: string }) => (
              <div key={error.message} className="flex items-center px-3 mt-1">
                <div className="w-1.5 h-1.5 rounded bg-red-700 "></div>
                <p className="px-2 text-sm text-red-500 font-poppins">
                  {error.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FormAlert;
