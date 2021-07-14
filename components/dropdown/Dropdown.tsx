import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { relationships } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "../../types/General";
import { changeContributionState } from "../../redux/reducer/contribution";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type HandleChangeType = {
  id: number;
  name: string;
};

export default function Dropdown() {
  const dispatch = useDispatch();
  const contributor = useSelector(
    (state: RootReduxState) => state.contribution.contributor
  );
  const [selected] = useState(contributor.relationship);

  useEffect(() => {}, [selected]);

  const handleChange = (value: HandleChangeType | any) => {
    dispatch(
      changeContributionState({ key: "relationship", value: value.name })
    );
  };

  return (
    <Listbox value={contributor.relationship} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="mt-2 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-200 rounded-md pl-4 pr-4 py-4 text-left  focus:border-primary cursor-default focus:outline-none sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate font-poppins">
                  {contributor.relationship}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none font-poppins">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full bg-white max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm font-poppins"
              >
                {relationships.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-gray-200" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9 font-poppins"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              " block truncate font-poppins"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-primary" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center font-poppins pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
